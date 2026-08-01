import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CompleteLessonButton from "@/components/student/CompleteLessonButton";

export default async function LessonPage({

    params

}:{
    params:Promise<{id:string}>
}){


    const {id}=await params;

    const lessonId=Number(id);


    const supabase=await createClient();



    const {

        data:{user}

    }=await supabase.auth.getUser();



    if(!user){

        redirect("/auth/login");

    }




    const {data:lesson}=await supabase

        .from("course_outlines")

        .select(`

            id,

            title,

            description,

            content,

            course_id,

            lesson_quizzes(

                id,

                title

            )

        `)

        .eq("id",lessonId)

        .single();




    if(!lesson){

        redirect("/student/my-courses");

    }




    const {data:progress}=await supabase

        .from("lesson_progress")

        .select("completed")

        .eq("lesson_id",lessonId)

        .eq("student_id",user.id)

        .maybeSingle();




    return(


        <main className="min-h-screen bg-brand-light p-4 md:p-6">


            <div className="mx-auto max-w-5xl rounded-2xl border border-brand-gold bg-white p-5 shadow md:p-8">



                <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">

                    {lesson.title}

                </h1>




                {lesson.description && (


                    <p className="mt-4 text-slate-600">

                        {lesson.description}

                    </p>


                )}




                {lesson.content && (


                    <div className="mt-8 rounded-xl bg-brand-light p-5 whitespace-pre-line text-slate-800 md:p-6">


                        {lesson.content}


                    </div>


                )}




                <div className="mt-8 rounded-xl border border-brand-gold p-4">


                    <p className="font-bold text-brand-dark">

                        Assessment

                    </p>


                    <p className="mt-2 text-sm text-slate-600">


                        {lesson.lesson_quizzes?.length > 0

                            ? "A quiz is available after this lesson."

                            : "No quiz available for this lesson."}


                    </p>


                </div>





                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">





                    {!progress?.completed ? (


                        <CompleteLessonButton

                            lessonId={lesson.id}

                        />


                    ) : (


                        <span className="rounded-xl bg-green-100 px-6 py-3 text-center font-bold text-green-700">

                            ✓ Lesson Completed

                        </span>


                    )}





                    {lesson.lesson_quizzes?.length > 0 && (


                        <Link


                            href={`/student/quizzes/${lesson.lesson_quizzes[0].id}`}


                            className="rounded-xl bg-brand-primary px-8 py-3 text-center font-bold text-white hover:bg-brand-dark"


                        >

                            Take Quiz

                        </Link>


                    )}



                </div>



            </div>



        </main>


    );


}
