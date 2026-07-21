import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function TutorsPage() {

    const supabase = await createClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


    if(!user){

        redirect("/admin/login");

    }


    const { data:profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id",user.id)
        .single();



    if(
        !profile ||
        (
            profile.role !== "super_admin" &&
            profile.role !== "admin"
        )
    ){

        redirect("/admin/login");

    }



    const { data:tutors } = await supabase
        .from("profiles")
        .select(`
            id,
            first_name,
            last_name,
            auth_email,
            role
        `)
        .eq("role","tutor")
        .order("created_at",{ascending:false});



    return (

        <main>

            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow">

                <h1 className="text-4xl font-bold text-brand-dark">
                    Tutor Management
                </h1>


                <div className="mt-4 h-1 w-32 rounded-full bg-brand-gold"/>


                <p className="mt-4 text-slate-600">
                    Manage Fermata Music Academy tutors.
                </p>


            </div>



            <div className="mt-8 rounded-xl bg-white p-6 shadow">

                <h2 className="text-2xl font-bold">
                    Current Tutors
                </h2>



                <div className="mt-5 space-y-4">


                    {tutors?.map((tutor)=>(

                        <div
                            key={tutor.id}
                            className="rounded-lg border border-brand-gold p-5"
                        >

                            <p className="text-xl font-bold">
                                {tutor.first_name} {tutor.last_name}
                            </p>


                            <p>
                                {tutor.auth_email}
                            </p>


                        </div>

                    ))}



                    {tutors?.length === 0 && (

                        <p className="text-slate-600">
                            No tutors created yet.
                        </p>

                    )}


                </div>


            </div>



            <Link
                href="/admin/tutors/new"
                className="mt-8 inline-block rounded-lg bg-brand-primary px-6 py-3 font-bold text-white"
            >
                Create Tutor
            </Link>


        </main>

    );

}
