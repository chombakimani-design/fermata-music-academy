import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function QuestionBankPage(){

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

    if(!user){

        redirect("/admin/login");

    }

    const {data:profile}=await supabase
        .from("profiles")
        .select("role")
        .eq("id",user.id)
        .single();

    if(
        profile?.role!=="admin" &&
        profile?.role!=="super_admin"
    ){

        redirect("/");

    }

    const {data:questions}=await supabase
        .from("lesson_quiz_questions")
        .select(`
            id,
            question,
            correct_answer,
            marks,
            lesson_quizzes(
                id,
                title
            )
        `)
        .order("id",{ascending:false});

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-7xl">

                <div className="flex items-center justify-between">

                    <h1 className="text-4xl font-bold text-brand-dark">

                        Question Bank

                    </h1>

                    <Link
                        href="/admin/quizzes"
                        className="rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white hover:bg-brand-dark"
                    >

                        Back to Quizzes

                    </Link>

                </div>

                <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">

                    <table className="w-full">

                        <thead className="bg-brand-primary text-white">

                            <tr>

                                <th className="p-4 text-left">

                                    Question

                                </th>

                                <th className="p-4 text-left">

                                    Quiz

                                </th>

                                <th className="p-4 text-left">

                                    Answer

                                </th>

                                <th className="p-4 text-left">

                                    Marks

                                </th>

                                <th className="p-4 text-left">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {questions?.map((question:any)=>(

                                <tr
                                    key={question.id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        {question.question}

                                    </td>

                                    <td className="p-4">

                                        {Array.isArray(question.lesson_quizzes)
                                            ? question.lesson_quizzes[0]?.title
                                            : question.lesson_quizzes?.title}

                                    </td>

                                    <td className="p-4">

                                        {question.correct_answer}

                                    </td>

                                    <td className="p-4">

                                        {question.marks}

                                    </td>

                                    <td className="p-4">

                                        <div className="flex gap-3">

                                            <Link
                                                href={`/admin/quiz-questions/${question.id}/edit`}
                                                className="rounded-lg border border-brand-primary px-3 py-2 text-sm font-semibold text-brand-primary"
                                            >

                                                Edit

                                            </Link>

                                            <Link
                                                href={`/admin/quizzes/${Array.isArray(question.lesson_quizzes)?question.lesson_quizzes[0]?.id:question.lesson_quizzes?.id}/questions`}
                                                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold"
                                            >

                                                View Quiz

                                            </Link>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                            {(!questions || questions.length===0)&&(

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="p-8 text-center text-slate-500"
                                    >

                                        No questions available.

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
