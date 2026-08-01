import { createClient } from "@/lib/supabase/server";


export default async function CourseCompletion({

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



    const totalLessons = lessons?.length || 0;



    const lessonIds = lessons?.map(

        lesson=>lesson.id

    ) || [];



    const {data:completed}=await supabase
        .from("lesson_progress")
        .select("id")
        .eq("student_id",studentId)
        .eq("completed",true)
        .in(
            "course_outline_id",
            lessonIds
        );



    const completedLessons = completed?.length || 0;



    const complete = totalLessons > 0 && completedLessons === totalLessons;



    return (

        <div className="mt-5 rounded-xl border border-brand-gold bg-brand-light p-4">


            <p className="font-bold text-brand-dark">

                {complete
                ? "Course Completed ✓"
                : `${completedLessons}/${totalLessons} lessons completed`}

            </p>


        </div>

    );

}
