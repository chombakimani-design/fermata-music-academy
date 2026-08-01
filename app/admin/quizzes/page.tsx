import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminQuizzesPage(){

    const supabase = await createClient();

    const {
        data:{user}
    } = await supabase.auth.getUser();

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

    const {data:quizzes}=await supabase
        .from("lesson_quizzes")
        .select(`
            id,
            title,
            pass_mark,
            time_limit_minutes,
            course_outlines(
                title
            )
        `)
        .order("id",{ascending:true});

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-6xl">

                <div className="flex items-center justify-between">

                    <h1 className="text-4xl font-bold text-brand-dark">

                        Lesson Quizzes

                    </h1>

                    <Link
                        href="/admin/quizzes/new"
                        className="rounded-xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"
                    >

                        New Quiz

                    </Link>

                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-brand-gold bg-white shadow">

                    <table className="w-full">

                        <thead className="bg-brand-primary text-white">

                            <tr>

                                <th className="p-4 text-left">

                                    Lesson

                                </th>

                                <th className="p-4 text-left">

                                    Quiz

                                </th>

                                <th className="p-4 text-left">

                                    Pass Mark

                                </th>

                                <th className="p-4 text-left">

                                    Time

                                </th>

                                <th className="p-4 text-left">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {quizzes?.map((quiz:any)=>(

                                <tr
                                    key={quiz.id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        {Array.isArray(quiz.course_outlines)
                                            ? quiz.course_outlines[0]?.title
                                            : quiz.course_outlines?.title}

                                    </td>

                                    <td className="p-4">

                                        {quiz.title}

                                    </td>

                                    <td className="p-4">

                                        {quiz.pass_mark}%

                                    </td>

                                    <td className="p-4">

                                        {quiz.time_limit_minutes ?? "-"} mins

                                    </td>

                                    <td className="p-4">

                                        <Link
                                            href={`/admin/quizzes/${quiz.id}/questions`}
                                            className="font-semibold text-brand-primary"
                                        >

                                            Manage Questions

                                        </Link>

                                    </td>

                                </tr>

                            ))}

                            {(!quizzes || quizzes.length===0)&&(

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="p-8 text-center text-slate-500"
                                    >

                                        No quizzes have been created.

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
