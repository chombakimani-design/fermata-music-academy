import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import FermataReceipt from "@/components/receipts/FermataReceipt";

export default async function ReceiptPage({
    params
}: {
    params: Promise<{
        id: string;
    }>
}) {

    const { id } = await params;

    const supabase = await createClient();


    const { data: receipt } = await supabase
        .from("receipts")
        .select(`
            id,
            receipt_number,
            issued_at,
            payments(
                amount,
                payment_method,
                transaction_reference,
                profiles(
                    student_id,
                    first_name,
                    last_name,
                    auth_email
                ),
                courses(
                    course_name
                )
            )
        `)
        .eq("id", id)
        .single();



    if (!receipt) {

        notFound();

    }



    return (

        <FermataReceipt>


            <div className="mt-8 space-y-5 text-slate-900">


                <div className="rounded-lg bg-brand-light p-5">

                    <h2 className="text-lg font-bold text-brand-dark">
                        Receipt Details
                    </h2>

                </div>



                <p>
                    <strong>Receipt Number:</strong>{" "}
                    {receipt.receipt_number}
                </p>



                <p>
                    <strong>Date Issued:</strong>{" "}
                    {
                        receipt.issued_at
                            ? new Date(
                                receipt.issued_at
                            ).toLocaleDateString()
                            : "-"
                    }
                </p>



                <hr className="border-brand-gold" />



                <p>
                    <strong>Student ID:</strong>{" "}
                    {receipt.payments?.[0]?.profiles?.[0]?.student_id}
                </p>



                <p>
                    <strong>Student Name:</strong>{" "}
                    {receipt.payments?.[0]?.profiles?.[0]?.first_name}{" "}
                    {receipt.payments?.[0]?.profiles?.[0]?.last_name}
                </p>



                <p>
                    <strong>Email:</strong>{" "}
                    {receipt.payments?.[0]?.profiles?.[0]?.auth_email}
                </p>



                <hr className="border-brand-gold" />



                <p>
                    <strong>Course:</strong>{" "}
                    {receipt.payments?.[0]?.courses?.[0]?.course_name}
                </p>



                <p>
                    <strong>Payment Method:</strong>{" "}
                    {receipt.payments?.[0]?.payment_method}
                </p>



                <p>
                    <strong>M-Pesa Reference:</strong>{" "}
                    {receipt.payments?.[0]?.transaction_reference}
                </p>



                <div className="mt-8 rounded-xl border-2 border-brand-gold bg-brand-light p-6 text-center">


                    <p className="text-sm font-semibold text-brand-dark">
                        AMOUNT PAID
                    </p>


                    <p className="mt-2 text-4xl font-bold text-brand-primary">
                        KES {receipt.payments?.[0]?.amount}
                    </p>


                    <p className="mt-3 font-bold text-brand-gold">
                        PAID
                    </p>


                </div>


            </div>


        </FermataReceipt>

    );

}
