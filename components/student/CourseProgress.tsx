import { createClient } from "@/lib/supabase/server";


export default async function CourseProgress({

    studentId,

    courseId

}:{
    studentId:string;
    courseId:number;
}){


    const supabase = await createClient();



    const {data:lessons}=await supabase
        .from("course_outlines")
        .select("id")
        .eq("course_id",courseId);



    const lessonIds = lessons?.map(
        lesson=>lesson.id
    ) || [];



    const {data:completed}=await supabase
        .from("lesson_progress")
        .select("id")
        .eq("student_id",studentId)
        .eq("completed",true)
        .in("course_outline_id",lessonIds);



    const total = lessonIds.length;

    const done = completed?.length || 0;



    const percentage = total===0
    ? 0
    : Math.round(
        (done / total) * 100
    );



    return (

        <div className="mt-5">


            <div className="flex justify-between text-sm font-semibold">

                <span>

                    Course Progress

                </span>


                <span>

                    {percentage}%

                </span>


            </div>



            <div className="mt-2 h-3 rounded-full bg-slate-200">


                <div

                    className="h-3 rounded-full bg-brand-primary"

                    style={{
                        width:`${percentage}%`
                    }}

                />


            </div>


        </div>

    );

}
