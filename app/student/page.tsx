import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function StudentPage() {


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
            "first_name,last_name,student_id,phone,role"
        )
        .eq(
            "id",
            user.id
        )
        .single();



    const { data:tutorLink } = await supabase
        .from("tutor_students")
        .select("tutor_id")
        .eq(
            "student_id",
            user.id
        )
        .maybeSingle();



    const { data:tutorAssignment } = await supabase
        .from("profiles")
        .select(`
            first_name,
            last_name,
            auth_email
        `)
        .eq(
            "id",
            tutorLink?.tutor_id
        )
        .maybeSingle();



    const { data:courses } = await supabase
        .from("student_courses")
        .select(`
            id,
            payment_status,
            courses(
                course_name,
                level
            )
        `)
        .eq(
            "student_id",
            user.id
        )
        .order(
            "id",
            {
                ascending:false
            }
        );



    return (

        <main className="mx-auto max-w-5xl space-y-8">


            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">


                <h1 className="text-4xl font-bold text-brand-dark">

                    🎵 Fermata Music Academy

                </h1>


                <div className="mt-4 h-1 w-32 rounded-full bg-brand-gold"/>


                <p className="mt-5 text-xl text-slate-700">

                    Welcome {profile?.first_name} {profile?.last_name}

                </p>


            </div>



            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow">


                <h2 className="text-2xl font-bold text-brand-dark">

                    Student Profile

                </h2>


                <div className="mt-5 space-y-3 text-slate-700">


                    <p>
                        <strong>Student ID:</strong>{" "}
                        <span className="font-bold text-brand-primary">
                            {profile?.student_id}
                        </span>
                    </p>


                    <p>
                        <strong>Phone:</strong>{" "}
                        {profile?.phone}
                    </p>


                    <p>
                        <strong>Status:</strong>{" "}
                        <span className="rounded-full bg-brand-gold px-3 py-1 font-bold text-brand-dark">
                            Registered Student
                        </span>
                    </p>


                </div>


            </div>




            <div className="mt-8 grid gap-8 md:grid-cols-2">



                <section className="rounded-2xl border border-brand-gold bg-white p-8 shadow">


                    <h2 className="text-2xl font-bold text-brand-dark">

                        My Tutor

                    </h2>



                    {tutorAssignment ? (

                        <div className="mt-5">


                            <p className="text-xl font-bold text-brand-primary">

                                {tutorAssignment.first_name}{" "}
                                {tutorAssignment.last_name}

                            </p>


                            <p className="mt-2 text-slate-600">

                                {tutorAssignment.auth_email}

                            </p>


                        </div>


                    ) : (


                        <p className="mt-5 text-slate-500">

                            No tutor assigned yet.

                        </p>


                    )}


                </section>




                <section className="rounded-2xl border border-brand-gold bg-white p-8 shadow">


                    <h2 className="text-2xl font-bold text-brand-dark">

                        My Courses

                    </h2>



                    {courses && courses.length > 0 ? (


                        <div className="mt-5 space-y-4">


                            {courses.map((item:any)=>(


                                <div
                                    key={item.id}
                                    className="rounded-xl border border-brand-gold bg-brand-light p-4"
                                >


                                    <p className="font-bold text-brand-primary">

                                        {item.courses?.[0]?.course_name}

                                    </p>


                                    <p className="text-slate-600">

                                        Level: {item.courses?.[0]?.level}

                                    </p>


                                    <p className="mt-2 font-semibold">

                                        Payment: {item.payment_status}

                                    </p>


                                </div>


                            ))}


                        </div>


                    ) : (


                        <p className="mt-5 text-slate-500">

                            No courses enrolled yet.

                        </p>


                    )}


                </section>



            </div>




            <div className="grid gap-6 md:grid-cols-3">


                {[
                    [
                        "/student/profile",
                        "Complete Profile",
                        "Add your personal information."
                    ],
                    [
                        "/student/my-courses",
                        "My Courses",
                        "View your enrolled music courses."
                    ],
                    [
                        "/student/payments",
                        "Payments",
                        "Manage your course payments."
                    ]

                ].map(([href,title,text])=>(


                    <Link
                        key={href}
                        href={href}
                        className="rounded-xl border border-brand-gold bg-white p-6 shadow hover:bg-brand-light"
                    >

                        <h3 className="text-xl font-bold text-brand-primary">

                            {title}

                        </h3>


                        <p className="mt-3 text-slate-600">

                            {text}

                        </p>


                        <div className="mt-5 h-1 w-16 rounded-full bg-brand-gold"/>


                    </Link>


                ))}


            </div>



        </main>

    );


}


