import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminReceiptsPage() {

    const supabase = await createClient();


    const { data: receipts } = await supabase
        .from("receipts")
        .select(`
            id,
            receipt_number,
            issued_at,
            payments(
                amount,
                payment_status,
                profiles(
                    student_id,
                    first_name,
                    last_name
                ),
                courses(
                    course_name
                )
            )
        `)
        .order("issued_at", {
            ascending: false
        });



    return (

        <main>


            <h1 className="text-4xl font-bold text-brand-dark">

                Receipts Management

            </h1>


            <p className="mt-2 text-slate-700">

                View generated student payment receipts.

            </p>



            <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">


                <table className="min-w-full">


                    <thead className="bg-brand-primary text-white">


                        <tr>

                            <th className="px-6 py-4 text-left">
                                Receipt
                            </th>

                            <th className="px-6 py-4 text-left">
                                Student
                            </th>

                            <th className="px-6 py-4 text-left">
                                Course
                            </th>

                            <th className="px-6 py-4 text-left">
                                Amount
                            </th>

                            <th className="px-6 py-4 text-left">
                                Date
                            </th>

                            <th className="px-6 py-4 text-left">
                                Action
                            </th>

                        </tr>


                    </thead>



                    <tbody>


                        {receipts?.map((receipt) => (


                            <tr
                                key={receipt.id}
                                className="border-b hover:bg-brand-light"
                            >


                                <td className="px-6 py-4 font-semibold text-brand-dark">

                                    {receipt.receipt_number}

                                </td>



                                <td className="px-6 py-4 text-slate-900">

                                    {receipt.payments?.[0]?.profiles?.[0]?.first_name}{" "}
                                    {receipt.payments?.[0]?.profiles?.[0]?.last_name}

                                </td>



                                <td className="px-6 py-4 text-slate-900">

                                    {receipt.payments?.[0]?.courses?.[0]?.course_name}

                                </td>



                                <td className="px-6 py-4 font-semibold text-brand-primary">

                                    KES {receipt.payments?.[0]?.amount}

                                </td>



                                <td className="px-6 py-4 text-slate-900">

                                    {
                                        receipt.issued_at
                                            ? new Date(
                                                receipt.issued_at
                                            ).toLocaleDateString()
                                            : "-"
                                    }

                                </td>



                                <td className="px-6 py-4">


                                    <Link
                                        href={`/student/receipts/${receipt.id}`}
                                        className="rounded-lg bg-brand-primary px-4 py-2 font-bold text-white hover:bg-brand-dark"
                                    >

                                        View

                                    </Link>


                                </td>


                            </tr>


                        ))}



                    </tbody>


                </table>


            </div>


        </main>

    );

}
