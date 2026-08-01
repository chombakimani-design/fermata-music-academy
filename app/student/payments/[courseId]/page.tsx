import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PaymentPage({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("student_id")
        .eq("id", user.id)
        .single();

    const { data: course } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

    if (!course) {
        redirect("/student/my-courses");
    }

    async function submitPayment(formData: FormData) {
        "use server";

        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            redirect("/auth/login");
        }

        const phone = String(formData.get("phone"));

        const { data: payment, error } = await supabase
            .from("payments")
            .insert({
                student_id: user.id,
                course_id: course.id,
                amount: course.fee,
                payment_method: "M-Pesa",
                payment_status: "Pending",
                payment_gateway: "TUMA",
            })
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/tuma/stk-push`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: course.fee,
                    phone,
                    description: `${course.course_name} Fees`,
                    callbackUrl:
                        `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/tuma/callback`,
                }),
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message ?? "Unable to initiate payment.");
        }

        await supabase
            .from("payments")
            .update({
                merchant_request_id: result.data.merchant_request_id,
                checkout_request_id: result.data.checkout_request_id,
            })
            .eq("id", payment.id);

        redirect("/student/payments");
    }

    return (
        <main className="mx-auto max-w-2xl p-10">
            <h1 className="text-4xl font-bold text-[#0B3C88]">
                Pay Course Fees
            </h1>

            <div className="mt-8 rounded-xl border p-6">
                <h2 className="text-2xl font-bold">
                    {course.course_name}
                </h2>

                <div className="mt-6 space-y-3">
                    <p>
                        <strong>Fee:</strong> KES {course.fee}
                    </p>

                    <p>
                        <strong>Student ID:</strong>{" "}
                        {profile?.student_id}
                    </p>

                    <p className="text-sm text-gray-600">
                        Enter the M-Pesa number that will receive the STK Push.
                    </p>
                </div>
            </div>

            <form
                action={submitPayment}
                className="mt-8 space-y-5"
            >
                <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="254712345678"
                    className="w-full rounded-lg border p-4"
                />

                <button className="w-full rounded-lg bg-[#16A34A] p-4 font-bold text-white">
                    Pay with M-Pesa
                </button>
            </form>
        </main>
    );
}
