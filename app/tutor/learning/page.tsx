import Link from "next/link";
import { createClient } from "@/lib/supabase/server";


export default async function TutorLearningPage(){


    const supabase = await createClient();



    const {
        data:{user}
    } = await supabase.auth.getUser();



    const {data:students}=await supabase
        .from("tutor_students")
        .select(`
            student_id,
            profiles(
                first_name,
                last_name,
                student_id
            )
        `)
        .eq("tutor_id",user?.id);



    return (

        <main className="min-h-screen bg-brand-light p-6">


            <div className="mx-auto max-w-6xl">


                <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">


                    <h1 className="text-4xl font-bold text-brand-dark">

                        Learning Progress Dashboard

                    </h1>


                    <p className="mt-3 text-slate-600">

                        Track student lesson completion and course progress.

                    </p>


                </div>




                <div className="mt-8 grid gap-6 md:grid-cols-2">


                    {students?.map((student:any)=>(


                        <div

                            key={student.student_id}

                            className="rounded-2xl border border-brand-gold bg-white p-8 shadow"

                        >


                            <h2 className="text-2xl font-bold text-brand-primary">

                                {student.profiles?.first_name}
                                {" "}
                                {student.profiles?.last_name}

                            </h2>



                            <p className="mt-2 text-slate-600">

                                ID:
                                {" "}
                                {student.profiles?.student_id}

                            </p>



                            <Link

                                href={`/tutor/students/${student.student_id}`}

                                className="mt-5 inline-block rounded-xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"

                            >

                                View Progress Report

                            </Link>


                        </div>


                    ))}



                    {(!students || students.length===0) && (

                        <div className="rounded-xl bg-white p-8 shadow">

                            No students assigned.

                        </div>

                    )}


                </div>


            </div>


        </main>

    );

}
