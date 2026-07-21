import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function PaymentPage({
    params
}: {
    params: Promise<{
        id: string;
    }>
}) {

    const { id } = await params;

    const supabase = await createClient();

    const { data: payment } = await supabase
        .from("payments")
        .select(`
            *,
            profiles(
                first_name,
                last_name,
                student_id,
                auth_email
            )
        `)
        .eq("id", id)
        .single();


    if (!payment) {

        notFound();

    }


    async function approve() {

        "use server";

        const supabase = await createClient();


        await supabase
            .from("payments")
            .update({

                payment_status: "Completed",

                paid_at: new Date().toISOString()

            })
            .eq("id", id);



        await supabase
            .from("student_courses")
            .update({

                payment_status: "Completed"

            })
            .eq("student_id", payment.student_id);



        const { data: receipt } = await supabase
            .from("receipts")
            .select("id")
            .eq("payment_id", id)
            .maybeSingle();



        if (!receipt) {

            await supabase
                .from("receipts")
                .insert({

                    payment_id: payment.id,

                    receipt_number:
                        "FMA-" + Date.now()

                });

        }


        redirect("/admin/payments");

    }



    async function reject() {

        "use server";


        const supabase = await createClient();


        await supabase
            .from("payments")
            .update({

                payment_status: "Rejected"

            })
            .eq("id", id);


        redirect("/admin/payments");

    }



    return (

        <main className="space-y-8">


            <div className="rounded-xl bg-white p-8 shadow">


                <h1 className="text-3xl font-bold text-[#0B3C88]">

                    Payment Review

                </h1>


                <div className="mt-6 space-y-3 text-slate-900">


                    <p>
                        <strong>Student:</strong>{" "}
                        {payment.profiles?.[0]?.first_name}{" "}
                        {payment.profiles?.[0]?.last_name}
                    </p>


                    <p>
                        <strong>Student ID:</strong>{" "}
                        {payment.profiles?.[0]?.student_id}
                    </p>


                    <p>
                        <strong>Email:</strong>{" "}
                        {payment.profiles?.[0]?.auth_email}
                    </p>


                    <p>
                        <strong>Amount:</strong>{" "}
                        KES {payment.amount}
                    </p>


                    <p>
                        <strong>Payment Method:</strong>{" "}
                        {payment.payment_method}
                    </p>


                    <p>
                        <strong>M-Pesa Reference:</strong>{" "}
                        {payment.transaction_reference}
                    </p>


                    <p>
                        <strong>Status:</strong>{" "}
                        {payment.payment_status}
                    </p>


                </div>



                <div className="mt-8 flex gap-4">


                    <form action={approve}>

                        <button
                            className="rounded-lg bg-green-600 px-6 py-3 font-bold text-white"
                        >
                            Approve Payment
                        </button>

                    </form>



                    <form action={reject}>

                        <button
                            className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white"
                        >
                            Reject Payment
                        </button>

                    </form>


                </div>


            </div>


        </main>

    );

}
