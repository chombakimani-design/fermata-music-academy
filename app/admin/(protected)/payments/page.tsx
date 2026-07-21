import { createClient } from "@/lib/supabase/server";

export default async function PaymentsPage() {

    const supabase = await createClient();


    const { data: payments } = await supabase
        .from("payments")
        .select(`
            id,
            amount,
            payment_method,
            transaction_reference,
            payment_status,
            courses(
                course_name
            ),
            profiles(
                student_id,
                first_name,
                last_name
            )
        `)
        .order("id", {
            ascending: false
        });



    async function updatePayment(formData: FormData) {

        "use server";


        const supabase = await createClient();


        const paymentId =
            Number(formData.get("payment_id"));


        const action =
            String(formData.get("action"));



        const { data: payment } = await supabase
            .from("payments")
            .select(`
                student_id,
                course_id
            `)
            .eq("id", paymentId)
            .single();



        if (!payment) {

            throw new Error("Payment record not found.");

        }



        if (action === "approve") {



            const { error: paymentError } =
                await supabase
                    .from("payments")
                    .update({

                        payment_status: "Completed",

                        paid_at:
                            new Date().toISOString()

                    })
                    .eq("id", paymentId);



            if (paymentError) {

                throw new Error(paymentError.message);

            }




            const { error: enrollmentError } =
                await supabase
                    .from("student_courses")
                    .update({

                        payment_status: "Completed"

                    })
                    .eq(
                        "student_id",
                        payment.student_id
                    )
                    .eq(
                        "course_id",
                        payment.course_id
                    );



            if (enrollmentError) {

                throw new Error(enrollmentError.message);

            }




            const { data: existingReceipt } =
                await supabase
                    .from("receipts")
                    .select("id")
                    .eq("payment_id", paymentId)
                    .maybeSingle();



            if (!existingReceipt) {


                const receiptNumber =
                    "FMA-" + Date.now();



                const { error: receiptError } =
                    await supabase
                        .from("receipts")
                        .insert({

                            payment_id: paymentId,

                            receipt_number: receiptNumber

                        });



                if (receiptError) {

                    throw new Error(receiptError.message);

                }

            }



        } else {



            const { error } =
                await supabase
                    .from("payments")
                    .update({

                        payment_status: "Rejected"

                    })
                    .eq("id", paymentId);



            if (error) {

                throw new Error(error.message);

            }


        }


    }



    return (

        <main>


            <h1 className="text-4xl font-bold text-[#0B3C88]">

                Verify Payments

            </h1>


            <p className="mt-2 text-slate-700">

                Review and approve M-Pesa payments.

            </p>



            <div className="mt-8 space-y-5">


                {payments?.map((payment) => (


                    <div
                        key={payment.id}
                        className="rounded-xl bg-white p-6 shadow"
                    >


                        <h2 className="text-xl font-bold text-slate-900">

                            {payment.profiles?.[0]?.first_name}{" "}
                            {payment.profiles?.[0]?.last_name}

                        </h2>



                        <div className="mt-3 space-y-2 text-slate-900">


                            <p>
                                Student ID:
                                {" "}
                                {payment.profiles?.[0]?.student_id}
                            </p>


                            <p>
                                Course:
                                {" "}
                                {payment.courses?.[0]?.course_name}
                            </p>


                            <p>
                                Amount:
                                {" "}
                                KES {payment.amount}
                            </p>


                            <p>
                                M-Pesa Reference:
                                {" "}
                                {payment.transaction_reference}
                            </p>


                            <p className="font-bold">

                                Status:
                                {" "}
                                {payment.payment_status}

                            </p>


                        </div>



                        {payment.payment_status === "Pending" && (

                            <form
                                action={updatePayment}
                                className="mt-5 flex gap-4"
                            >


                                <input
                                    type="hidden"
                                    name="payment_id"
                                    value={payment.id}
                                />



                                <button
                                    name="action"
                                    value="approve"
                                    className="rounded-lg bg-green-700 px-5 py-3 font-bold text-white"
                                >

                                    Approve Payment

                                </button>



                                <button
                                    name="action"
                                    value="reject"
                                    className="rounded-lg bg-red-700 px-5 py-3 font-bold text-white"
                                >

                                    Reject Payment

                                </button>


                            </form>

                        )}



                    </div>


                ))}



                {payments?.length === 0 && (

                    <div className="rounded-xl bg-white p-6 text-slate-700 shadow">

                        No payments found.

                    </div>

                )}


            </div>


        </main>

    );

}
