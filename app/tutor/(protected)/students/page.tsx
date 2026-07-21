import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function TutorStudentsPage() {


    const supabase = await createClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


    if(!user){

        redirect("/tutor/login");

    }



    const { data:profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id",user.id)
        .single();



    if(
        !profile ||
        profile.role !== "tutor"
    ){

        redirect("/tutor/login");

    }



    const { data:students } = await supabase
        .from("tutor_students")
        .select(`
            id,
            profiles!tutor_students_student_id_fkey(
                id,
                first_name,
                last_name,
                student_id,
                auth_email
            )
        `)
        .eq("tutor_id",user.id);



    return (

        <main>


            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow">


                <h1 className="text-4xl font-bold text-brand-dark">

                    My Students

                </h1>


                <div className="mt-4 h-1 w-32 rounded-full bg-brand-gold" />


            </div>



            <div className="mt-8 space-y-5">


                {students?.map((item:any)=>(


                    <div
                        key={item.id}
                        className="rounded-xl border border-brand-gold bg-white p-6 shadow"
                    >


                        <h2 className="text-xl font-bold text-brand-primary">

                            {item.profiles?.[0]?.first_name} {item.profiles?.[0]?.last_name}

                        </h2>



                        <p className="mt-2">

                            Student ID: {item.profiles?.[0]?.student_id}

                        </p>



                        <p>

                            {item.profiles?.[0]?.auth_email}

                        </p>



                        <Link
                            href={`/tutor/students/${item.profiles?.[0]?.id}`}
                            className="mt-5 inline-block rounded-lg bg-brand-primary px-5 py-3 font-bold text-white"
                        >

                            View Student Profile

                        </Link>


                    </div>


                ))}



                {students?.length === 0 && (

                    <div className="rounded-xl border border-brand-gold bg-white p-6">

                        No students have been assigned to you yet.

                    </div>

                )}



            </div>



        </main>

    );

}

