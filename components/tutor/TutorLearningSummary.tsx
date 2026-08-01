import { createClient } from "@/lib/supabase/server";


export default async function TutorLearningSummary({

    studentId

}:{
    studentId:string;
}){


    const supabase = await createClient();



    const {data:lessons}=await supabase
        .from("course_outlines")
        .select(`
            id,
            courses!inner(
                id
            )
        `)
        .in(
            "course_id",
            (
                await supabase
                .from("student_courses")
                .select("course_id")
                .eq("student_id",studentId)
            ).data?.map(item=>item.course_id) || []
        );



    const lessonIds = lessons?.map(
        lesson=>lesson.id
    ) || [];



    const {data:progress}=await supabase
        .from("lesson_progress")
        .select(`
            completed
        `)
        .eq("student_id",studentId)
        .in("course_outline_id",lessonIds);



    const total = lessonIds.length;

    const completed = progress?.filter(
        item=>item.completed
    ).length || 0;


    const remaining = total - completed;



    return (

        <div className="mt-6 grid gap-4 md:grid-cols-3">


            <div className="rounded-xl border border-brand-gold bg-white p-5 shadow">

                <p className="text-sm text-slate-500">

                    Total Lessons

                </p>

                <p className="mt-2 text-3xl font-bold text-brand-dark">

                    {total}

                </p>

            </div>



            <div className="rounded-xl border border-brand-gold bg-white p-5 shadow">

                <p className="text-sm text-slate-500">

                    Completed

                </p>

                <p className="mt-2 text-3xl font-bold text-brand-primary">

                    {completed}

                </p>

            </div>



            <div className="rounded-xl border border-brand-gold bg-white p-5 shadow">

                <p className="text-sm text-slate-500">

                    Remaining

                </p>

                <p className="mt-2 text-3xl font-bold text-brand-dark">

                    {remaining}

                </p>

            </div>


        </div>

    );

}
