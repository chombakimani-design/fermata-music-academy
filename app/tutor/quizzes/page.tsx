import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TutorQuizzesPage(){

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

    if(!user){

        redirect("/tutor/login");

    }

    const {data:profile}=await supabase
        .from("profiles")
        .select("role")
        .eq("id",user.id)
        .single();

    if(profile?.role!=="tutor"){

        redirect("/");

    }

    const {data:attempts}=await supabase
        .from("lesson_quiz_attempts")
        .select(`
            id,
            score,
            percentage,
            passed,
            submitted_at,
            profiles(
                first_name,
                last_name,
                student_id
            ),
            lesson_quizzes(
                title,
                course_outlines(
                    title
                )
            )
        `)
        .order("submitted_at",{ascending:false});

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-7xl">

                <div className="flex items-center justify-between">

                    <h1 className="text-4xl font-bold text-brand-dark">

                        Student Quiz Results

                    </h1>

                    <Link
                        href="/tutor/dashboard"
                        className="rounded-xl border border-brand-primary px-5 py-3 font-semibold text-brand-primary"
                    >

                        Back to Dashboard

                    </Link>

                </div>

                <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">

                    <table className="w-full">

                        <thead className="bg-brand-primary text-white">

                            <tr>

                                <th className="p-4 text-left">Student</th>

                                <th className="p-4 text-left">Student ID</th>

                                <th className="p-4 text-left">Lesson</th>

                                <th className="p-4 text-left">Quiz</th>

                                <th className="p-4 text-left">Score %</th>

                                <th className="p-4 text-left">Result</th>

                                <th className="p-4 text-left">Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {attempts?.map((attempt:any)=>(

                                <tr
                                    key={attempt.id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        {attempt.profiles?.first_name} {attempt.profiles?.last_name}

                                    </td>

                                    <td className="p-4">

                                        {attempt.profiles?.student_id}

                                    </td>

                                    <td className="p-4">

                                        {Array.isArray(attempt.lesson_quizzes?.course_outlines)
                                            ? attempt.lesson_quizzes.course_outlines[0]?.title
                                            : attempt.lesson_quizzes?.course_outlines?.title}

                                    </td>

                                    <td className="p-4">

                                        {attempt.lesson_quizzes?.title}

                                    </td>

                                    <td className="p-4">

                                        {attempt.percentage}%

                                    </td>

                                    <td className="p-4">

                                        <span className={attempt.passed ? "text-green-600 font-bold" : "text-red-600 font-bold"}>

                                            {attempt.passed ? "PASS" : "FAIL"}

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        {attempt.submitted_at
                                            ? new Date(attempt.submitted_at).toLocaleDateString()
                                            : "-"}

                                    </td>

                                </tr>

                            ))}

                            {(!attempts || attempts.length===0)&&(

                                <tr>

                                    <td
                                        colSpan={7}
                                        className="p-8 text-center text-slate-500"
                                    >

                                        No quiz attempts found.

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </main>

    );

}
