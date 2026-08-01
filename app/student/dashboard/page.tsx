import Link from "next/link";
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

        <main className="min-h-screen bg-brand-light p-4 md:p-6">


            <div className="mx-auto max-w-6xl">



                <div className="rounded-2xl border border-brand-gold bg-white p-5 shadow-xl md:p-8">


                    <div className="flex justify-center">

                        <Logo
                            width={180}
                            height={80}
                        />

                    </div>



                    <h1 className="mt-8 text-3xl font-bold text-brand-dark md:text-4xl">

                        Welcome {profile?.first_name || "Student"}

                    </h1>



                    <p className="mt-3 text-slate-600">

                        Student Dashboard

                    </p>



                    <p className="mt-2 text-sm text-slate-500">

                        Student ID:
                        {" "}
                        {profile?.student_id || "-"}

                    </p>


                </div>




                <LearningSummary

                    studentId={user.id}

                />





                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">



                    <Link

                        href="/student/my-courses"

                        className="rounded-2xl border border-brand-gold bg-white p-5 shadow transition hover:bg-brand-light md:p-8"

                    >

                        <h2 className="text-xl font-bold text-brand-primary">

                            🎓 My Courses

                        </h2>


                        <p className="mt-2 text-sm text-slate-600 md:text-base">

                            Continue learning and track your enrolled courses.

                        </p>


                    </Link>





                    <Link

                        href="/student/learning"

                        className="rounded-2xl border border-brand-gold bg-white p-5 shadow transition hover:bg-brand-light md:p-8"

                    >

                        <h2 className="text-xl font-bold text-brand-primary">

                            📖 Learning Progress

                        </h2>


                        <p className="mt-2 text-sm text-slate-600 md:text-base">

                            View lessons completed and monitor your progress.

                        </p>


                    </Link>





                    <Link

                        href="/student/practice"

                        className="rounded-2xl border border-brand-gold bg-white p-5 shadow transition hover:bg-brand-light md:p-8"

                    >

                        <h2 className="text-xl font-bold text-brand-primary">

                            🎼 Practice Centre

                        </h2>


                        <p className="mt-2 text-sm text-slate-600 md:text-base">

                            Practise music knowledge questions and improve skills.

                        </p>


                    </Link>





                    <Link

                        href="/student/payments"

                        className="rounded-2xl border border-brand-gold bg-white p-5 shadow transition hover:bg-brand-light md:p-8"

                    >

                        <h2 className="text-xl font-bold text-brand-primary">

                            💳 Payments

                        </h2>


                        <p className="mt-2 text-sm text-slate-600 md:text-base">

                            Submit and track your course payments.

                        </p>


                    </Link>





                    <Link

                        href="/student/receipts"

                        className="rounded-2xl border border-brand-gold bg-white p-5 shadow transition hover:bg-brand-light md:p-8"

                    >

                        <h2 className="text-xl font-bold text-brand-primary">

                            📄 Receipts

                        </h2>


                        <p className="mt-2 text-sm text-slate-600 md:text-base">

                            Access your payment receipts.

                        </p>


                    </Link>



                </div>



            </div>


        </main>

    );

}
