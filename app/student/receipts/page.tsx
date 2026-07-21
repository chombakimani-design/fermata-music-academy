import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function ReceiptsPage() {


    const supabase = await createClient();



    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();



    if(!user){

        redirect("/auth/login");

    }



    const { data:receipts } = await supabase
        .from("receipts")
        .select(`
            id,
            receipt_number,
            issued_at,
            payments(
                amount,
                payment_status,
                courses(
                    course_name
                )
            )
        `)
        .eq(
            "payments.student_id",
            user.id
        )
        .order(
            "issued_at",
            {
                ascending:false
            }
        );




    return (

        <main className="mx-auto max-w-5xl">


            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">


                <h1 className="text-4xl font-bold text-brand-dark">

                    My Receipts

                </h1>


                <div className="mt-4 h-1 w-32 rounded-full bg-brand-gold"/>


                <p className="mt-4 text-slate-600">

                    Your official Fermata Music Academy payment receipts.

                </p>


            </div>





            <div className="mt-8 space-y-6">



                {receipts?.map((receipt)=>(


                    <div

                        key={receipt.id}

                        className="rounded-2xl border border-brand-gold bg-white p-8 shadow-lg"

                    >



                        <div className="flex items-center justify-between">


                            <h2 className="text-2xl font-bold text-brand-primary">

                                {receipt.receipt_number}

                            </h2>



                            <span className="rounded-full bg-brand-gold px-4 py-2 text-sm font-bold text-brand-dark">

                                {receipt.payments?.[0]?.payment_status}

                            </span>



                        </div>





                        <div className="mt-6 space-y-3 text-slate-700">



                            <p>

                                <strong>Course:</strong>{" "}

                                {receipt.payments?.[0]?.courses?.[0]?.course_name}

                            </p>




                            <p className="text-xl">


                                <strong>Amount:</strong>{" "}

                                <span className="font-bold text-brand-gold">

                                    KES {receipt.payments?.[0]?.amount}

                                </span>


                            </p>



                        </div>





                        <Link

                            href={`/student/receipts/${receipt.id}`}

                            className="mt-6 inline-block rounded-lg bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"

                        >

                            View Official Receipt

                        </Link>



                    </div>


                ))}





                {receipts?.length===0 && (


                    <div className="rounded-xl border border-brand-gold bg-white p-6 text-slate-700">

                        No receipts available yet.

                    </div>


                )}



            </div>



        </main>


    );


}

