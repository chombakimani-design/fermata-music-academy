import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function QuizAnalyticsPage(){

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

    const {data:attempts}=await supabase
        .from("lesson_quiz_attempts")
        .select(`
            id,
            score,
            percentage,
            passed,
            lesson_quizzes(
                id,
                title
            )
        `);

    const totalAttempts=attempts?.length ?? 0;

    const passedAttempts=
        attempts?.filter(
            (a:any)=>a.passed
        ).length ?? 0;

    const failedAttempts=
        totalAttempts-passedAttempts;

    const averageScore=
        totalAttempts===0
        ? 0
        : (
            attempts!
            .reduce(
                (sum:number,a:any)=>sum+(a.percentage??0),
                0
            )/totalAttempts
        ).toFixed(1);

    const grouped=new Map<number,any>();

    attempts?.forEach((attempt:any)=>{

        const quiz=Array.isArray(attempt.lesson_quizzes)
            ? attempt.lesson_quizzes[0]
            : attempt.lesson_quizzes;

        if(!quiz){

            return;

        }

        if(!grouped.has(quiz.id)){

            grouped.set(

                quiz.id,

                {

                    title:quiz.title,

                    attempts:0,

                    passes:0,

                    total:0

                }

            );

        }

        const item=grouped.get(quiz.id);

        item.attempts++;

        item.total+=attempt.percentage??0;

        if(attempt.passed){

            item.passes++;

        }

    });

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-7xl">

                <h1 className="text-4xl font-bold text-brand-dark">

                    Quiz Analytics

                </h1>

                <div className="mt-8 grid gap-6 md:grid-cols-4">

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-slate-500">

                            Attempts

                        </p>

                        <p className="mt-2 text-3xl font-bold">

                            {totalAttempts}

                        </p>

                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-slate-500">

                            Passed

                        </p>

                        <p className="mt-2 text-3xl font-bold text-green-600">

                            {passedAttempts}

                        </p>

                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-slate-500">

                            Failed

                        </p>

                        <p className="mt-2 text-3xl font-bold text-red-600">

                            {failedAttempts}

                        </p>

                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-slate-500">

                            Average %

                        </p>

                        <p className="mt-2 text-3xl font-bold text-brand-primary">

                            {averageScore}%

                        </p>

                    </div>

                </div>

                <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow">

                    <table className="w-full">

                        <thead className="bg-brand-primary text-white">

                            <tr>

                                <th className="p-4 text-left">

                                    Quiz

                                </th>

                                <th className="p-4 text-left">

                                    Attempts

                                </th>

                                <th className="p-4 text-left">

                                    Passes

                                </th>

                                <th className="p-4 text-left">

                                    Pass Rate

                                </th>

                                <th className="p-4 text-left">

                                    Average %

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {Array.from(grouped.values()).map((quiz:any,index:number)=>(

                                <tr
                                    key={index}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        {quiz.title}

                                    </td>

                                    <td className="p-4">

                                        {quiz.attempts}

                                    </td>

                                    <td className="p-4">

                                        {quiz.passes}

                                    </td>

                                    <td className="p-4">

                                        {((quiz.passes/quiz.attempts)*100).toFixed(1)}%

                                    </td>

                                    <td className="p-4">

                                        {(quiz.total/quiz.attempts).toFixed(1)}%

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </main>

    );

}
