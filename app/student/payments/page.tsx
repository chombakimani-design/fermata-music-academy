import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function PaymentsPage() {


    const supabase = await createClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();



    if(!user){

        redirect("/auth/login");

    }



    const { data:courses } = await supabase
        .from("student_courses")
        .select(`
            id,
            course_id,
            payment_status,
            courses(
                course_name,
                fee
            )
        `)
        .eq(
            "student_id",
            user.id
        );




    async function submitPayment(formData:FormData){

        "use server";


        const supabase = await createClient();


        const {
            data:{
                user
            }
        } = await supabase.auth.getUser();



        if(!user){

            redirect("/auth/login");

        }



        const courseId = Number(
            formData.get("course_id")
        );


        const amount = Number(
            formData.get("amount")
        );


        const reference = String(
            formData.get("transaction_reference")
        );



        const { error } = await supabase
            .from("payments")
            .insert({

                student_id:user.id,

                course_id:courseId,

                amount,

                payment_method:"M-Pesa",

                transaction_reference:reference,

                payment_status:"Pending"

            });



        if(error){

            throw new Error(error.message);

        }

        await supabase
            .from("student_courses")
            .update({
                payment_status:"Submitted"
            })
            .eq("student_id",user.id)
            .eq("course_id",courseId);



        redirect("/student/payments");

    }





    return (

        <main className="mx-auto max-w-5xl p-8">


            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow">


                <h1 className="text-4xl font-bold text-brand-dark">

                    Payments

                </h1>


                <p className="mt-3 text-slate-600">

                    Submit your M-Pesa payment details.

                </p>


            </div>




            <div className="mt-8 space-y-6">


                {courses?.map((item:any)=>(


                    <div
                        key={item.id}
                        className="rounded-2xl border border-brand-gold bg-white p-8 shadow"
                    >


                        <h2 className="text-2xl font-bold text-brand-primary">

                            {item.courses?.[0]?.course_name}

                        </h2>



                        <p className="mt-2">

                            Amount:
                            {" "}
                            KES {item.courses?.[0]?.fee}

                        </p>




                        <p className="mt-2">

                            Current Status:
                            {" "}
                            <strong>
                                {item.payment_status}
                            </strong>

                        </p>




                        {item.payment_status === "Pending" && (


                            <form
                                action={submitPayment}
                                className="mt-6 space-y-4"
                            >


                                <input
                                    type="hidden"
                                    name="course_id"
                                    value={item.course_id}
                                />


                                <input
                                    type="hidden"
                                    name="amount"
                                    value={item.courses?.[0]?.fee}
                                />



                                <input

                                    name="transaction_reference"

                                    required

                                    placeholder="M-Pesa Transaction Code"

                                    className="w-full rounded-lg border p-4"

                                />



                                <button

                                    className="rounded-xl bg-brand-primary px-6 py-3 font-bold text-white"

                                >

                                    Submit Payment

                                </button>


                            </form>


                        )}



                    </div>


                ))}



            </div>


        </main>

    );


}



