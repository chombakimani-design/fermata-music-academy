import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function TutorCoursesPage(){

    const supabase = await createClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


    if(!user){

        redirect("/tutor/login");

    }



    const { data: assignments } = await supabase
        .from("tutor_courses")
        .select(`
            id,
            course_id
        `)
        .eq(
            "tutor_id",
            user.id
        );



    const courseIds =
        assignments?.map(
            item => item.course_id
        ) ?? [];



    const { data:courses } = await supabase
        .from("courses")
        .select(`
            id,
            course_name,
            description,
            duration,
            level
        `)
        .in(
            "id",
            courseIds
        )
        .order(
            "course_name"
        );



    return (

        <main>


            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow">

                <h1 className="text-4xl font-bold text-brand-dark">
                    My Courses
                </h1>

                <div className="mt-4 h-1 w-32 rounded-full bg-brand-gold"/>

            </div>




            <div className="mt-8 space-y-5">


                {courses?.map(course=>(


                    <div
                        key={course.id}
                        className="rounded-xl border border-brand-gold bg-white p-6 shadow"
                    >


                        <h2 className="text-2xl font-bold text-brand-primary">

                            {course.course_name}

                        </h2>



                        <p className="mt-3 text-slate-700">

                            {course.description}

                        </p>



                        <p className="mt-3">

                            Duration: {course.duration}

                        </p>



                        <p>

                            Level: {course.level}

                        </p>



                    </div>


                ))}




                {courses?.length === 0 && (

                    <div className="rounded-xl border border-brand-gold bg-white p-6">

                        No courses assigned.

                    </div>

                )}


            </div>


        </main>

    );

}
