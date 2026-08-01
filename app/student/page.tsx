import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getStudentProfile, getStudentCourses } from "@/lib/student/student";
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



    const profile = await getStudentProfile(user.id);



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



    const courses = await getStudentCourses(user.id);



    return (

        <main className="mx-auto w-full max-w-5xl space-y-6 p-4 md:space-y-8 md:p-6">



            <div className="rounded-2xl border border-brand-gold bg-white p-5 shadow-xl md:p-8">


                <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">

                    🎵 Fermata Music Academy

                </h1>


                <div className="mt-4 h-1 w-32 rounded-full bg-brand-gold"/>


                <p className="mt-5 text-lg text-slate-700 md:text-xl">

                    Welcome {profile?.first_name || "Student"} {profile?.last_name || ""}

                </p>


            </div>




            <div className="rounded-2xl border border-brand-gold bg-white p-5 shadow md:p-8">


                <h2 className="text-xl font-bold text-brand-dark md:text-2xl">

                    Student Profile

                </h2>


                <div className="mt-5 space-y-3 text-slate-700">


                    <p>
                        <strong>Student ID:</strong>{" "}
                        <span className="font-bold text-brand-primary">
                            {profile?.student_id || "-"}
                        </span>
                    </p>


                    <p>
                        <strong>Phone:</strong>{" "}
                        {profile?.phone || "-"}
                    </p>


                    <p>
                        <strong>Status:</strong>{" "}
                        <span className="rounded-full bg-brand-gold px-3 py-1 font-bold text-brand-dark">
                            Registered Student
                        </span>
                    </p>


                </div>


            </div>





            <div className="grid gap-5 md:grid-cols-2">



                <section className="rounded-2xl border border-brand-gold bg-white p-5 shadow md:p-8">


                    <h2 className="text-xl font-bold text-brand-dark md:text-2xl">

                        My Tutor

                    </h2>



                    {tutorAssignment ? (


                        <div className="mt-5">


                            <p className="text-xl font-bold text-brand-primary">

                                {tutorAssignment.first_name}{" "}
                                {tutorAssignment.last_name}

                            </p>


                            <p className="mt-2 break-all text-slate-600">

                                {tutorAssignment.auth_email}

                            </p>


                        </div>


                    ) : (


                        <p className="mt-5 text-slate-500">

                            No tutor assigned yet.

                        </p>


                    )}


                </section>





                <section className="rounded-2xl border border-brand-gold bg-white p-5 shadow md:p-8">


                    <h2 className="text-xl font-bold text-brand-dark md:text-2xl">

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





            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">


                {[

                    [
                        "/student/profile",
                        "👤 Profile",
                        "Complete your personal information."
                    ],

                    [
                        "/student/my-courses",
                        "🎓 Courses",
                        "View enrolled courses."
                    ],

                    [
                        "/student/learning",
                        "📖 Learning",
                        "Track learning progress."
                    ],

                    [
                        "/student/practice",
                        "🎼 Practice",
                        "Practise music knowledge."
                    ],

                    [
                        "/student/payments",
                        "💳 Payments",
                        "Manage payments."
                    ]

                ].map(([href,title,text])=>(


                    <Link

                        key={href}

                        href={href}

                        className="rounded-xl border border-brand-gold bg-white p-5 shadow transition hover:bg-brand-light"

                    >


                        <h3 className="font-bold text-brand-primary">

                            {title}

                        </h3>


                        <p className="mt-3 text-sm text-slate-600">

                            {text}

                        </p>


                        <div className="mt-5 h-1 w-16 rounded-full bg-brand-gold"/>


                    </Link>


                ))}


            </div>



        </main>

    );


}
