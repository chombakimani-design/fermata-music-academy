import { createClient } from "@/lib/supabase/server";


export default async function LearningSummary({

    studentId

}:{
    studentId:string;
}){


    const supabase = await createClient();



    const {count:completedLessons}=await supabase
        .from("lesson_progress")
        .select(
            "id",
            {
                count:"exact",
                head:true
            }
        )
        .eq("student_id",studentId)
        .eq("completed",true);



    const {count:startedLessons}=await supabase
        .from("lesson_progress")
        .select(
            "id",
            {
                count:"exact",
                head:true
            }
        )
        .eq("student_id",studentId);



    const {count:courses}=await supabase
        .from("student_courses")
        .select(
            "id",
            {
                count:"exact",
                head:true
            }
        )
        .eq("student_id",studentId);



    return (

        <div className="mt-8 grid gap-5 md:grid-cols-3">


            <div className="rounded-2xl border border-brand-gold bg-white p-6 shadow">

                <h3 className="font-bold text-brand-dark">

                    Courses

                </h3>

                <p className="mt-3 text-3xl font-bold text-brand-primary">

                    {courses ?? 0}

                </p>

            </div>



            <div className="rounded-2xl border border-brand-gold bg-white p-6 shadow">

                <h3 className="font-bold text-brand-dark">

                    Lessons Started

                </h3>

                <p className="mt-3 text-3xl font-bold text-brand-primary">

                    {startedLessons ?? 0}

                </p>

            </div>



            <div className="rounded-2xl border border-brand-gold bg-white p-6 shadow">

                <h3 className="font-bold text-brand-dark">

                    Lessons Completed

                </h3>

                <p className="mt-3 text-3xl font-bold text-brand-primary">

                    {completedLessons ?? 0}

                </p>

            </div>


        </div>

    );

}
