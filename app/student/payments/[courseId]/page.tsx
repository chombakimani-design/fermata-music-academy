import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PaymentPage({
    params
}: {
    params: Promise<{ courseId: string }>
}) {

    const { courseId } = await params;

    const supabase = await createClient();

    const {
        data: { user }
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
            data: { user }
        } = await supabase.auth.getUser();

        if (!user) {

            redirect("/auth/login");

        }

        const { error } = await supabase
            .from("payments")
            .insert({

                student_id: user.id,

                course_id: course.id,

                amount: course.fee,

                payment_method: "M-Pesa",

                transaction_reference: String(
                    formData.get("transaction_reference")
                ),

                payment_status: "Pending"

            });

        if (error) {

            throw new Error(error.message);

        }

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

                        <strong>Fee:</strong>

                        {" "}KES {course.fee}

                    </p>

                    <p>

                        <strong>Paybill:</strong>

                        123456

                    </p>

                    <p>

                        <strong>Account Number:</strong>

                        {" "}

                        {profile?.student_id}

                    </p>

                </div>

            </div>

            <form
                action={submitPayment}
                className="mt-8 space-y-5"
            >

                <input
                    name="transaction_reference"
                    required
                    placeholder="M-Pesa Transaction Code"
                    className="w-full rounded-lg border p-4"
                />

                <button
                    className="w-full rounded-lg bg-[#0B3C88] p-4 font-bold text-white"
                >

                    Submit Payment

                </button>

            </form>

        </main>

    );

}
