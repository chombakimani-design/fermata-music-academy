import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function QuizResultsPage({

    params

}:{
    params:Promise<{id:string}>
}){

    const {id}=await params;

    const attemptId=Number(id);

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

    if(!user){

        redirect("/auth/login");

    }

    const {data:attempt,error}=await supabase

        .from("lesson_quiz_attempts")

        .select(`
            id,
            score,
            percentage,
            passed,
            submitted_at,
            lesson_quizzes(
                id,
                title,
                pass_mark,
                lesson_id
            )
        `)

        .eq("id",attemptId)

        .eq("student_id",user.id)

        .single();

    const lessonId = Array.isArray((attempt as any).lesson_quizzes) ? (attempt as any).lesson_quizzes[0]?.lesson_id : null;

    if(error || !attempt){

        redirect("/student/my-courses");

    }

    const {data:answers}=await supabase

        .from("lesson_quiz_answers")

        .select(`
            id,
            selected_answer,
            is_correct,
            marks_awarded,
            lesson_quiz_questions(
                id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_answer,
                marks
            )
        `)

        .eq("attempt_id",attemptId);

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-5xl">

                <div className="rounded-2xl bg-white p-8 shadow">

                    <h1 className="text-4xl font-bold text-brand-dark">

                        Quiz Results

                    </h1>

                    <div className="mt-8 grid gap-6 md:grid-cols-3">

                        <div className="rounded-xl border p-6">

                            <p className="text-slate-500">

                                Score

                            </p>

                            <p className="mt-2 text-3xl font-bold">

                                {attempt.score}

                            </p>

                        </div>

                        <div className="rounded-xl border p-6">

                            <p className="text-slate-500">

                                Percentage

                            </p>

                            <p className="mt-2 text-3xl font-bold">

                                {attempt.percentage}%

                            </p>

                        </div>

                        <div className="rounded-xl border p-6">

                            <p className="text-slate-500">

                                Result

                            </p>

                            <p className={attempt.passed
                                ?"mt-2 text-3xl font-bold text-green-600"
                                :"mt-2 text-3xl font-bold text-red-600"}>

                                {attempt.passed
                                    ?"PASS"
                                    :"FAIL"}

                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-8 space-y-6">

                    {answers?.map((answer:any,index:number)=>{

                        const question=Array.isArray(answer.lesson_quiz_questions)

                            ?answer.lesson_quiz_questions[0]

                            :answer.lesson_quiz_questions;

                        return(

                            <div
                                key={answer.id}
                                className="rounded-2xl bg-white p-6 shadow"
                            >

                                <h2 className="font-bold">

                                    {index+1}. {question?.question}

                                </h2>

                                <div className="mt-4 space-y-2">

                                    {question?.option_a && <p>A. {question.option_a}</p>}

                                    {question?.option_b && <p>B. {question.option_b}</p>}

                                    {question?.option_c && <p>C. {question.option_c}</p>}

                                    {question?.option_d && <p>D. {question.option_d}</p>}

                                </div>

                                <div className="mt-5 grid gap-2 md:grid-cols-2">

                                    <p>

                                        <strong>Your Answer:</strong> {answer.selected_answer}

                                    </p>

                                    <p>

                                        <strong>Correct Answer:</strong> {question?.correct_answer}

                                    </p>

                                    <p>

                                        <strong>Marks:</strong> {answer.marks_awarded}/{question?.marks}

                                    </p>

                                    <p className={answer.is_correct
                                        ?"font-bold text-green-600"
                                        :"font-bold text-red-600"}>

                                        {answer.is_correct
                                            ?"Correct"
                                            :"Incorrect"}

                                    </p>

                                </div>

                            </div>

                        );

                    })}

                </div>

                <div className="mt-10 flex gap-4">

                    {!attempt.passed && (

                        <Link
                            href={`/student/quizzes/${lessonId}`}
                            className="rounded-xl border border-brand-primary px-8 py-3 font-bold text-brand-primary"
                        >

                            Retake Quiz

                        </Link>

                    )}

                    <Link
                        href="/student/my-courses"
                        className="rounded-xl bg-brand-primary px-8 py-3 font-bold text-white"
                    >

                        Back to My Courses

                    </Link>

                </div>

            </div>

        </main>

    );

}



