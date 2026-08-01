import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PracticeHistoryPage(){

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

    if(!user){

        redirect("/auth/login");

    }

    const {data:attempts,error}=await supabase

        .from("practice_attempts")

        .select(`
            id,
            score,
            total_marks,
            percentage,
            created_at
        `)

        .eq("student_id",user.id)

        .order("created_at",{ascending:false});

    if(error){

        throw new Error(error.message);

    }

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-6xl">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-brand-dark">

                            Practice History

                        </h1>

                        <p className="mt-2 text-slate-600">

                            Review all your practice sessions and monitor your progress.

                        </p>

                    </div>

                    <Link
                        href="/student/practice/random"
                        className="rounded-xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"
                    >

                        New Practice Test

                    </Link>

                </div>

                <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">

                    <table className="w-full">

                        <thead className="bg-brand-primary text-white">

                            <tr>

                                <th className="p-4 text-left">

                                    Date

                                </th>

                                <th className="p-4 text-left">

                                    Score

                                </th>

                                <th className="p-4 text-left">

                                    Percentage

                                </th>

                                <th className="p-4 text-left">

                                    Rating

                                </th>

                                <th className="p-4 text-left">

                                    Details

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {attempts?.length===0 && (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="p-10 text-center text-slate-500"
                                    >

                                        No practice attempts found.

                                    </td>

                                </tr>

                            )}

                            {attempts?.map((attempt)=>{

                                let rating="Needs Practice";

                                if(attempt.percentage>=80){

                                    rating="Excellent";

                                }else if(attempt.percentage>=60){

                                    rating="Good";

                                }else if(attempt.percentage>=40){

                                    rating="Fair";

                                }

                                return(

                                    <tr
                                        key={attempt.id}
                                        className="border-t"
                                    >

                                        <td className="p-4">

                                            {new Date(attempt.created_at).toLocaleString()}

                                        </td>

                                        <td className="p-4">

                                            {attempt.score}/{attempt.total_marks}

                                        </td>

                                        <td className="p-4 font-semibold">

                                            {attempt.percentage}%

                                        </td>

                                        <td className="p-4">

                                            {rating}

                                        </td>

                                        <td className="p-4">

                                            <Link
                                                href={`/student/practice/results/${attempt.id}`}
                                                className="font-semibold text-brand-primary hover:underline"
                                            >

                                                View Report

                                            </Link>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            </div>

        </main>

    );

}
