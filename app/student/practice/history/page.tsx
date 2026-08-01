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

        <main className="min-h-screen bg-brand-light p-4 md:p-6">


            <div className="mx-auto max-w-6xl">


                <div className="rounded-2xl border border-brand-gold bg-white p-5 shadow md:flex md:items-center md:justify-between md:p-8">


                    <div>

                        <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">

                            Practice History

                        </h1>


                        <p className="mt-2 text-sm text-slate-600 md:text-base">

                            Review all your practice sessions and monitor your progress.

                        </p>

                    </div>



                    <Link

                        href="/student/practice/random"

                        className="mt-5 block rounded-xl bg-brand-primary px-6 py-3 text-center font-bold text-white hover:bg-brand-dark md:mt-0"

                    >

                        New Practice Test

                    </Link>


                </div>



                <div className="mt-8 space-y-4 md:hidden">


                    {attempts?.map((attempt)=>{


                        const rating=

                            attempt.percentage>=80

                            ?"Excellent"

                            :attempt.percentage>=60

                            ?"Good"

                            :attempt.percentage>=40

                            ?"Fair"

                            :"Needs Practice";


                        return(

                            <div

                                key={attempt.id}

                                className="rounded-xl bg-white p-5 shadow"

                            >

                                <p className="text-sm text-slate-500">
                                    Date
                                </p>

                                <p className="break-words font-semibold">
                                    {new Date(attempt.created_at).toLocaleString()}
                                </p>


                                <p className="mt-3 text-sm text-slate-500">
                                    Score
                                </p>

                                <p className="font-bold">
                                    {attempt.score}/{attempt.total_marks}
                                </p>


                                <p className="mt-3 text-sm text-slate-500">
                                    Percentage
                                </p>

                                <p className="font-bold">
                                    {attempt.percentage}%
                                </p>


                                <p className="mt-3 text-sm text-slate-500">
                                    Rating
                                </p>

                                <p className="font-semibold">
                                    {rating}
                                </p>


                                <Link

                                    href={`/student/practice/results/${attempt.id}`}

                                    className="mt-5 block rounded-lg bg-brand-primary px-4 py-2 text-center font-bold text-white"

                                >

                                    View Report

                                </Link>


                            </div>

                        );

                    })}


                    {attempts?.length===0 && (

                        <div className="rounded-xl bg-white p-8 text-center text-slate-500">

                            No practice attempts found.

                        </div>

                    )}


                </div>




                <div className="mt-8 hidden overflow-x-auto rounded-2xl bg-white shadow md:block">


                    <table className="min-w-[700px] w-full">


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


                            {attempts?.map((attempt)=>{


                                const rating=

                                    attempt.percentage>=80

                                    ?"Excellent"

                                    :attempt.percentage>=60

                                    ?"Good"

                                    :attempt.percentage>=40

                                    ?"Fair"

                                    :"Needs Practice";


                                return(

                                    <tr

                                        key={attempt.id}

                                        className="border-t"

                                    >

                                        <td className="p-4 text-sm">

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


                        </tbody>


                    </table>


                </div>


            </div>


        </main>

    );


}
