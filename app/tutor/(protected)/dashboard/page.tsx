import Link from "next/link";
import Logo from "@/components/branding/Logo";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function TutorDashboardPage(){

    const supabase = await createClient();

    const {
        data:{user}
    } = await supabase.auth.getUser();


    if(!user){
        redirect("/tutor/login");
    }


    const {data:profile}=await supabase
        .from("profiles")
        .select(`
            first_name,
            last_name,
            role
        `)
        .eq("id",user.id)
        .single();



    return (

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-5xl">


                <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">

                    <div className="flex justify-center">
                        <Logo width={180} height={80}/>
                    </div>


                    <h1 className="mt-8 text-4xl font-bold text-brand-dark">
                        Welcome {profile?.first_name}
                    </h1>


                    <p className="mt-3 text-slate-600">
                        Tutor Dashboard
                    </p>

                </div>



                <div className="mt-8 grid gap-6 md:grid-cols-3">


                    <Link
                        href="/tutor/courses"
                        className="rounded-2xl border border-brand-gold bg-white p-8 shadow hover:bg-brand-light"
                    >

                        <h2 className="text-xl font-bold text-brand-primary">
                            My Courses
                        </h2>

                        <p className="mt-2 text-slate-600">
                            Manage assigned courses.
                        </p>

                    </Link>



                    <Link
                        href="/tutor/students"
                        className="rounded-2xl border border-brand-gold bg-white p-8 shadow hover:bg-brand-light"
                    >

                        <h2 className="text-xl font-bold text-brand-primary">
                            Students
                        </h2>

                        <p className="mt-2 text-slate-600">
                            View assigned students.
                        </p>

                    </Link>



                    <Link
                        href="/tutor/learning"
                        className="rounded-2xl border border-brand-gold bg-white p-8 shadow hover:bg-brand-light"
                    >

                        <h2 className="text-xl font-bold text-brand-primary">
                            Learning Progress
                        </h2>

                        <p className="mt-2 text-slate-600">
                            Monitor lesson completion.
                        </p>

                    </Link>


                </div>


            </div>

        </main>

    );

}
