import Logo from "@/components/branding/Logo";
import LearningSummary from "@/components/student/LearningSummary";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function StudentDashboardPage(){


    const supabase = await createClient();



    const {
        data:{user}
    } = await supabase.auth.getUser();



    if(!user){

        redirect("/auth/login");

    }



    const {data:profile}=await supabase
        .from("profiles")
        .select(`
            first_name,
            last_name,
            student_id
        `)
        .eq("id",user.id)
        .single();



    return (

        <main className="min-h-screen bg-brand-light p-6">


            <div className="mx-auto max-w-6xl">


                <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">


                    <div className="flex justify-center">

                        <Logo
                            width={180}
                            height={80}
                        />

                    </div>



                    <h1 className="mt-8 text-4xl font-bold text-brand-dark">

                        Welcome {profile?.first_name}

                    </h1>



                    <p className="mt-3 text-slate-600">

                        Student Dashboard

                    </p>



                    <p className="mt-2 text-sm text-slate-500">

                        Student ID:
                        {" "}
                        {profile?.student_id}

                    </p>


                </div>




                <LearningSummary

                    studentId={user.id}

                />




                <div className="mt-8 grid gap-6 md:grid-cols-3">


                    <a

                        href="/student/my-courses"

                        className="rounded-2xl border border-brand-gold bg-white p-8 shadow hover:bg-brand-light"

                    >

                        <h2 className="text-xl font-bold text-brand-primary">

                            My Courses

                        </h2>


                        <p className="mt-2 text-slate-600">

                            Continue learning and track progress.

                        </p>


                    </a>




                    <a

                        href="/student/learning"

                        className="rounded-2xl border border-brand-gold bg-white p-8 shadow hover:bg-brand-light"

                    >

                        <h2 className="text-xl font-bold text-brand-primary">

                            Learning Progress

                        </h2>


                        <p className="mt-2 text-slate-600">

                            View completed lessons.

                        </p>


                    </a>




                    <a

                        href="/student/receipts"

                        className="rounded-2xl border border-brand-gold bg-white p-8 shadow hover:bg-brand-light"

                    >

                        <h2 className="text-xl font-bold text-brand-primary">

                            Receipts

                        </h2>


                        <p className="mt-2 text-slate-600">

                            Access payment receipts.

                        </p>


                    </a>


                </div>


            </div>


        </main>

    );

}
