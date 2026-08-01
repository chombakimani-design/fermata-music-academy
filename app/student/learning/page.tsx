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

        <div className="mt-10 rounded-2xl border border-brand-gold bg-white p-6 shadow">

            <h2 className="text-2xl font-bold text-brand-dark">

                Lesson Quizzes

            </h2>

            <div className="mt-6 space-y-4">

                {lessons?.map((lesson:any)=>(

                    <div
                        key={lesson.id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 p-5"
                    >

                        <div>

                            <h3 className="font-bold text-brand-primary">

                                {lesson.title}

                            </h3>

                            <p className="mt-1 text-sm text-slate-500">

                                {lesson.lesson_quizzes?.length
                                    ? lesson.lesson_quizzes.length + " Quiz"
                                    : "No Quiz"}

                            </p>

                        </div>

                        <div>

                            {lesson.lesson_quizzes?.length>0 ? (

                                <Link
                                    href={`/student/quizzes/${lesson.lesson_quizzes[0].id}`}
                                    className="rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white hover:bg-brand-dark"
                                >

                                    Take Quiz

                                </Link>

                            ) : (

                                <span className="text-slate-400">

                                    —

                                </span>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}
