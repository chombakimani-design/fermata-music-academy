import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PaymentHistoryPage() {

    const supabase = await createClient();

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const { data: payments } = await supabase
        .from("payments")
        .select(`
            id,
            amount,
            payment_method,
            transaction_reference,
            payment_status,
            paid_at,
            receipts(
                id,
                receipt_number
            ),
            courses(
                course_name
            )
        `)
        .eq("student_id", user.id)
        .order("id", {
            ascending: false
        });


    return (

        <main className="mx-auto max-w-5xl p-4 md:p-10">

            <h1 className="text-3xl font-bold text-[#0B3C88] md:text-4xl">
                Payment History
            </h1>

            <p className="mt-2 text-slate-700">
                Your M-Pesa payment records.
            </p>


            <div className="mt-8 space-y-4 md:hidden">

                {payments?.map((payment) => (

                    <div
                        key={payment.id}
                        className="rounded-xl border bg-white p-5 shadow"
                    >

                        <p className="font-semibold text-[#0B3C88]">
                            Course
                        </p>

                        <p className="text-slate-900">
                            {payment.courses?.[0]?.course_name}
                        </p>


                        <p className="mt-3 font-semibold text-[#0B3C88]">
                            Amount
                        </p>

                        <p className="text-slate-900">
                            KES {payment.amount}
                        </p>


                        <p className="mt-3 font-semibold text-[#0B3C88]">
                            Reference
                        </p>

                        <p className="break-all text-slate-900">
                            {payment.transaction_reference}
                        </p>


                        <p className="mt-3 font-semibold text-[#0B3C88]">
                            Status
                        </p>

                        <div className="mt-1">

                            {payment.payment_status === "Completed" && (
                                <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-800">
                                    Completed
                                </span>
                            )}

                            {payment.payment_status === "Pending" && (
                                <span className="rounded-full bg-yellow-100 px-3 py-1 font-semibold text-yellow-800">
                                    Pending
                                </span>
                            )}

                            {payment.payment_status === "Rejected" && (
                                <span className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-800">
                                    Rejected
                                </span>
                            )}

                        </div>


                        <div className="mt-4">

                            {payment.receipts?.[0] ? (

                                <Link
                                    href={`/student/receipts/${payment.receipts[0].id}`}
                                    className="block rounded-lg bg-[#0B3C88] px-4 py-2 text-center text-white"
                                >
                                    View Receipt
                                </Link>

                            ) : (

                                <span className="text-slate-500">
                                    Receipt not available
                                </span>

                            )}

                        </div>


                    </div>

                ))}


                {payments?.length === 0 && (

                    <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
                        No payment records found.
                    </div>

                )}

            </div>



            <div className="mt-8 hidden overflow-x-auto rounded-xl border bg-white shadow md:block">

                <table className="min-w-full">

                    <thead className="bg-[#0B3C88] text-white">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Course
                            </th>

                            <th className="px-6 py-4 text-left">
                                Amount
                            </th>

                            <th className="px-6 py-4 text-left">
                                Reference
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left">
                                Receipt
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {payments?.map((payment) => (

                            <tr
                                key={payment.id}
                                className="border-b"
                            >

                                <td className="px-6 py-4 text-slate-900">
                                    {payment.courses?.[0]?.course_name}
                                </td>


                                <td className="px-6 py-4 text-slate-900">
                                    KES {payment.amount}
                                </td>


                                <td className="px-6 py-4 text-slate-900">
                                    {payment.transaction_reference}
                                </td>


                                <td className="px-6 py-4">

                                    {payment.payment_status}

                                </td>


                                <td className="px-6 py-4">

                                    {payment.receipts?.[0] ? (

                                        <Link
                                            href={`/student/receipts/${payment.receipts[0].id}`}
                                            className="rounded-lg bg-[#0B3C88] px-4 py-2 text-white"
                                        >
                                            View Receipt
                                        </Link>

                                    ) : (

                                        <span className="text-slate-500">
                                            Not available
                                        </span>

                                    )}

                                </td>


                            </tr>

                        ))}


                    </tbody>

                </table>

            </div>


        </main>

    );

}
