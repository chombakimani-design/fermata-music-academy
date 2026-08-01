import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PracticeAnalyticsPage(){

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

    const {data:attempts,error}=await supabase

        .from("practice_attempts")

        .select(`
            id,
            student_id,
            score,
            total_marks,
            percentage,
            created_at,
            profiles(
                first_name,
                last_name,
                student_id
            )
        `)

        .order("created_at",{ascending:false});

    if(error){

        throw new Error(error.message);

    }

    const totalAttempts=attempts?.length ?? 0;

    const averageScore=

        totalAttempts===0

        ?0

        :(
            attempts.reduce(
                (sum,a)=>sum+Number(a.percentage),
                0
            )/totalAttempts
        ).toFixed(1);

    const excellent=

        attempts?.filter(

            a=>Number(a.percentage)>=80

        ).length ?? 0;

    const struggling=

        attempts?.filter(

            a=>Number(a.percentage)<40

        ).length ?? 0;

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-7xl">

                <h1 className="text-4xl font-bold text-brand-dark">

                    Practice Analytics

                </h1>

                <div className="mt-8 grid gap-6 md:grid-cols-4">

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p>Total Attempts</p>

                        <h2 className="mt-2 text-3xl font-bold">

                            {totalAttempts}

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p>Average</p>

                        <h2 className="mt-2 text-3xl font-bold">

                            {averageScore}%

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p>Excellent</p>

                        <h2 className="mt-2 text-3xl font-bold text-green-600">

                            {excellent}

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p>Needs Support</p>

                        <h2 className="mt-2 text-3xl font-bold text-red-600">

                            {struggling}

                        </h2>

                    </div>

                </div>

                <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow">

                    <table className="w-full">

                        <thead className="bg-brand-primary text-white">

                            <tr>

                                <th className="p-4 text-left">

                                    Student

                                </th>

                                <th className="p-4 text-left">

                                    Student ID

                                </th>

                                <th className="p-4 text-left">

                                    Score

                                </th>

                                <th className="p-4 text-left">

                                    Percentage

                                </th>

                                <th className="p-4 text-left">

                                    Date

                                </th>

                                <th className="p-4 text-left">

                                    Report

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {attempts?.map((attempt:any)=>{

                                const profile=Array.isArray(attempt.profiles)

                                    ?attempt.profiles[0]

                                    :attempt.profiles;

                                return(

                                    <tr
                                        key={attempt.id}
                                        className="border-t"
                                    >

                                        <td className="p-4">

                                            {profile?.first_name} {profile?.last_name}

                                        </td>

                                        <td className="p-4">

                                            {profile?.student_id}

                                        </td>

                                        <td className="p-4">

                                            {attempt.score}/{attempt.total_marks}

                                        </td>

                                        <td className="p-4 font-semibold">

                                            {attempt.percentage}%

                                        </td>

                                        <td className="p-4">

                                            {new Date(attempt.created_at).toLocaleString()}

                                        </td>

                                        <td className="p-4">

                                            <Link
                                                href={`/student/practice/results/${attempt.id}`}
                                                className="text-brand-primary hover:underline"
                                            >

                                                View

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
