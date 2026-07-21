import Link from "next/link";
import Logo from "@/components/branding/Logo";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function WelcomePage() {


    const supabase = await createClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();



    if(!user){

        redirect("/auth/login");

    }



    const { data:profile } = await supabase
        .from("profiles")
        .select(
            "first_name,student_id"
        )
        .eq(
            "id",
            user.id
        )
        .single();




    return (

        <main className="min-h-screen bg-brand-light flex items-center justify-center p-6">


            <div className="w-full max-w-xl rounded-2xl border border-brand-gold bg-white p-10 text-center shadow-xl">



                <div className="flex justify-center">

                    <Logo
                        width={200}
                        height={85}
                    />

                </div>



                <div className="mt-5 h-px w-full bg-brand-gold"/>



                <h1 className="mt-8 text-4xl font-bold text-brand-dark">

                    Welcome to Fermata Music Academy

                </h1>



                <p className="mt-5 text-lg text-slate-600">

                    Your student account has been created successfully.

                </p>



                <p className="mt-6 text-2xl font-bold text-brand-primary">

                    Welcome {profile?.first_name}

                </p>




                <div className="mt-8 rounded-2xl border-2 border-brand-gold bg-brand-light p-8">


                    <p className="text-sm font-bold uppercase tracking-widest text-slate-500">

                        Your Student ID

                    </p>



                    <p className="mt-4 text-5xl font-black text-brand-primary">

                        {profile?.student_id}

                    </p>



                    <div className="mt-6 h-px bg-brand-gold"/>



                    <p className="mt-5 text-slate-600">

                        Save this ID.
                        You will use it with your password whenever you log in.

                    </p>


                </div>




                <Link

                    href="/student/profile"

                    className="mt-8 inline-block w-full rounded-xl bg-brand-primary p-4 font-bold text-white shadow hover:bg-brand-dark"

                >

                    Complete My Profile

                </Link>




                <p className="mt-6 text-sm text-slate-500">

                    Next: choose your music courses and begin your journey.

                </p>


            </div>


        </main>

    );


}
