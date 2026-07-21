import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function StudentDashboard(){

    const supabase = await createClient();

    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


    

    

    if(!user){

        redirect("/auth/login");

    }


    const { data:student } = await supabase
        .from("profiles")
        .select(`
            id,
            first_name,
            last_name,
            auth_email
        `)
        .eq("id", user.id)
        .eq("role","student")
        .single();


    

    

    if(!student){

        redirect("/auth/login");

    }


    const { data:tutorAssignment } = await supabase
        .from("tutor_students")
        .select(`
            id,
            profiles!tutor_students_tutor_id_fkey(
                first_name,
                last_name,
                auth_email
            )
        `)
        .eq("student_id", student.id)
        .maybeSingle();


    const { data:tutorLink } = await supabase
        .from("tutor_students")
        .select("tutor_id")
        .eq("student_id", student.id)
        .maybeSingle();


    const { data:courses } = await supabase
        .from("tutor_courses")
        .select(`
            id,
            courses(
                id,
                course_name,
                level
            )
        `)
        .eq("tutor_id", tutorLink?.tutor_id);




    return (

        <main className="min-h-screen bg-slate-100 p-8">

            <div className="rounded-xl bg-white p-8 shadow">

                <h1 className="text-4xl font-bold text-brand-dark">

                    Welcome {student.first_name}

                </h1>

                <p className="mt-2 text-slate-600">

                    {student.auth_email}

                </p>

            </div>


            <div className="mt-8 grid gap-8 md:grid-cols-2">


                <section className="rounded-xl bg-white p-6 shadow">

                    <h2 className="text-2xl font-bold">

                        My Tutor

                    </h2>


                    {tutorAssignment?.profiles ? (

                        <div className="mt-4">

                            <p className="font-semibold">

                                {tutorAssignment.profiles?.[0]?.first_name}{" "}
                                {tutorAssignment.profiles?.[0]?.last_name}

                            </p>

                            <p className="text-slate-500">

                                {tutorAssignment.profiles?.[0]?.auth_email}

                            </p>

                        </div>

                    ) : (

                        <p className="mt-4 text-slate-500">

                            No tutor assigned yet.

                        </p>

                    )}

                </section>



                <section className="rounded-xl bg-white p-6 shadow">

                    <h2 className="text-2xl font-bold">

                        My Courses

                    </h2>


                    {courses && courses.length > 0 ? (

                        <div className="mt-4 space-y-3">

                            {courses.map((item:any)=>(

                                <div
                                    key={item.id}
                                    className="rounded-lg border border-brand-gold p-4"
                                >

                                    <p className="font-bold">

                                        {item.courses.course_name}

                                    </p>

                                    <p className="text-slate-500">

                                        {item.courses.level}

                                    </p>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <p className="mt-4 text-slate-500">

                            No courses assigned yet.

                        </p>

                    )}

                </section>


            </div>

        </main>

    );

}









