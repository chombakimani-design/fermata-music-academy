import Link from "next/link";
import { createClient } from "@/lib/supabase/server";


export default async function StudentLearningPage(){


    const supabase=await createClient();



    const {

        data:{user}

    }=await supabase.auth.getUser();



    if(!user){

        return null;

    }




    const {data:lessons}=await supabase
        .from("course_outlines")
        .select(`
            id,
            title,
            lesson_quizzes(
                id,
                title
            )
        `)
        .order("id");




    return(


        <div className="mt-8 rounded-2xl border border-brand-gold bg-white p-5 shadow md:p-6">


            <h2 className="text-xl font-bold text-brand-dark md:text-2xl">

                Learning Activities

            </h2>


            <p className="mt-2 text-slate-600">

                Access lessons and complete available quizzes.

            </p>




            <div className="mt-6 space-y-4">



                {lessons && lessons.length > 0 ? (


                    lessons.map((lesson:any)=>(


                        <div

                            key={lesson.id}

                            className="rounded-xl border border-slate-200 p-4 md:p-5"

                        >



                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                                <div>


                                    <h3 className="font-bold text-brand-primary">

                                        {lesson.title}

                                    </h3>


                                    <p className="mt-1 text-sm text-slate-500">


                                        {lesson.lesson_quizzes?.length || 0}

                                        {" "}

                                        {(lesson.lesson_quizzes?.length || 0) === 1
                                            ? "Quiz"
                                            : "Quizzes"}


                                    </p>


                                </div>





                                <div>


                                    {lesson.lesson_quizzes?.length > 0 ? (


                                        <Link

                                            href={`/student/quizzes/${lesson.lesson_quizzes[0].id}`}

                                            className="block rounded-xl bg-brand-primary px-5 py-3 text-center font-semibold text-white hover:bg-brand-dark"

                                        >

                                            Take Quiz

                                        </Link>


                                    ) : (


                                        <span className="text-slate-400">

                                            No quiz available

                                        </span>


                                    )}


                                </div>



                            </div>



                        </div>


                    ))


                ) : (


                    <div className="rounded-xl border border-slate-200 p-8 text-center text-slate-500">

                        No learning activities available yet.

                    </div>


                )}



            </div>



        </div>


    );

}
