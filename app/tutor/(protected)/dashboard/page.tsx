import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TutorDashboardPage() {

    const supabase = await createClient();

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();


    if (!user) {
        redirect("/tutor/login");
    }


    const { data: profile } = await supabase
        .from("profiles")
        .select(`
            id,
            first_name,
            role
        `)
        .eq("id", user.id)
        .single();


    if (!profile || profile.role !== "tutor") {
        redirect("/tutor/login");
    }


    const { data: courses } = await supabase
        .from("tutor_courses")
        .select(`
            course_id,
            courses(
                course_name,
                level
            )
        `)
        .eq("tutor_id", user.id);


    const courseIds = courses?.map((course:any)=>course.course_id) ?? [];


    const { data: students } = await supabase
        .from("student_courses")
        .select(`
            course_id,
            profiles!student_courses_student_id_fkey(
                id,
                first_name,
                last_name,
                student_id
            )
        `)
        .in("course_id", courseIds);



    const studentIds =
        students?.map((student:any)=>student.profiles.id) ?? [];


    const { data: assessments } = await supabase
        .from("assessments")
        .select(`
            student_id,
            assessment_type
        `)
        .in("student_id", studentIds);



    return (

        <main className="space-y-8">


            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow">

                <h1 className="text-4xl font-bold text-brand-dark">
                    Welcome, {profile.first_name}
                </h1>

                <p className="mt-3 text-slate-600">
                    Fermata Music Academy Tutor Portal
                </p>

            </div>



            {courses?.map((course:any)=>(

                <section
                    key={course.course_id}
                    className="rounded-xl border border-brand-primary/20 bg-white p-6 shadow-sm"
                >

                    <h2 className="text-2xl font-bold text-brand-dark">
                        {course.courses?.[0]?.course_name}
                    </h2>

                    <p className="text-slate-500">
                        Level: {course.courses?.[0]?.level}
                    </p>


                    <h3 className="mt-6 text-lg font-semibold">
                        Students
                    </h3>


                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">


                    {students
                        ?.filter((student:any)=>
                            student.course_id === course.course_id
                        )
                        .map((student:any)=>{


                            const completed =
                                assessments?.filter((a:any)=>
                                    a.student_id === student.profiles.id &&
                                    a.assessment_type === "Internal"
                                ).length ?? 0;



                            return (

                                <div
                                    key={student.profiles.id}
                                    className="rounded-xl border border-brand-primary/20 p-4"
                                >

                                    <Link
                                        href={`/tutor/students/${student.profiles.id}`}
                                        className="font-semibold text-brand-primary hover:underline"
                                    >
                                        {student.profiles.first_name}{" "}
                                        {student.profiles.last_name}
                                    </Link>


                                    <p className="mt-2 rounded-full bg-brand-gold/20 px-3 py-1 text-xs inline-block">
                                        {student.profiles.student_id}
                                    </p>


                                    <p className="mt-3 text-sm font-semibold">
                                        Internal Assessments: {completed} / 6
                                    </p>


                                    <Link
                                        href={`/tutor/students/${student.profiles.id}`}
                                        className="mt-4 inline-block rounded-lg bg-brand-primary px-4 py-2 text-white"
                                    >
                                        View Profile
                                    </Link>


                                </div>

                            );

                        })}


                    </div>


                </section>

            ))}


        </main>

    );

}

