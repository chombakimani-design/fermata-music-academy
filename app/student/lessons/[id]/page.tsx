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

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow">


                <h1 className="text-4xl font-bold text-brand-dark">

                    {lesson.title}

                </h1>


                {lesson.description && (

                    <p className="mt-4 text-slate-600">

                        {lesson.description}

                    </p>

                )}


                {lesson.content && (

                    <div className="mt-8 whitespace-pre-line text-slate-800">

                        {lesson.content}

                    </div>

                )}


                <div className="mt-10 flex flex-wrap gap-4">


                    {!progress?.completed ? (

                        <CompleteLessonButton

                            lessonId={lesson.id}

                        />

                    ):(

                        <span className="rounded-xl bg-green-100 px-6 py-3 font-bold text-green-700">

                            ✓ Lesson Completed

                        </span>

                    )}



                    {lesson.lesson_quizzes?.length>0 && (

                        <Link

                            href={`/student/quizzes/${lesson.lesson_quizzes[0].id}`}

                            className="rounded-xl bg-brand-primary px-8 py-3 font-bold text-white"

                        >

                            Take Quiz

                        </Link>

                    )}


                </div>


            </div>

        </main>

    );

}
