import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function StudentProfilePage({
    params
}: {
    params: Promise<{
        id: string;
    }>
}) {

    const { id } = await params;


    const supabase = await createClient();



    const { data: student } = await supabase
        .from("profiles")
        .select(`
            student_id,
            first_name,
            last_name,
            auth_email,
            role
        `)
        .eq("id", id)
        .single();



    if (!student) {

        notFound();

    }



    const { data: enrollments } = await supabase
        .from("student_courses")
        .select(`
            competence_level,
            availability,
            payment_status,
            courses(
                course_name,
                fee
            )
        `)
        .eq("student_id", id);



    const { data: payments } = await supabase
        .from("payments")
        .select(`
            amount,
            payment_method,
            transaction_reference,
            payment_status
        `)
        .eq("student_id", id);



    return (

        <main>


            <h1 className="text-4xl font-bold text-[#0B3C88]">

                Student Profile

            </h1>



            <div className="mt-8 rounded-xl bg-white p-8 shadow">


                <h2 className="text-2xl font-bold text-slate-900">

                    {student.first_name} {student.last_name}

                </h2>



                <div className="mt-4 space-y-2 text-slate-900">


                    <p>
                        Student ID: {student.student_id}
                    </p>


                    <p>
                        Email: {student.auth_email}
                    </p>


                    <p>
                        Role: {student.role}
                    </p>


                </div>


            </div>




            <div className="mt-8 rounded-xl bg-white p-8 shadow">


                <h2 className="text-2xl font-bold text-[#0B3C88]">

                    Enrolled Courses

                </h2>



                <div className="mt-5 space-y-4">


                    {enrollments?.map((item, index) => (


                        <div
                            key={index}
                            className="rounded-lg border p-4 text-slate-900"
                        >

                            <p className="font-bold">

                                {item.courses?.[0]?.course_name}

                            </p>


                            <p>
                                Fee: KES {item.courses?.[0]?.fee}
                            </p>


                            <p>
                                Level: {item.competence_level}
                            </p>


                            <p>
                                Payment Status: {item.payment_status}
                            </p>


                        </div>


                    ))}


                </div>


            </div>




            <div className="mt-8 rounded-xl bg-white p-8 shadow">


                <h2 className="text-2xl font-bold text-[#0B3C88]">

                    Payments

                </h2>



                <div className="mt-5 space-y-4">


                    {payments?.map((payment, index) => (


                        <div
                            key={index}
                            className="rounded-lg border p-4 text-slate-900"
                        >

                            <p>
                                Amount: KES {payment.amount}
                            </p>


                            <p>
                                Method: {payment.payment_method}
                            </p>


                            <p>
                                Reference: {payment.transaction_reference}
                            </p>


                            <p>
                                Status: {payment.payment_status}
                            </p>


                        </div>


                    ))}


                </div>


            </div>



        </main>

    );

}
