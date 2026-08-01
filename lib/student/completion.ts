import { createClient } from "@/lib/supabase/server";


export async function checkCourseCompletion(

    studentId:string,

    courseId:number

){


    const supabase = await createClient();



    const {data:lessons}=await supabase
        .from("course_outlines")
        .select("id")
        .eq("course_id",courseId);



    if(!lessons || lessons.length===0){

        return false;

    }



    const lessonIds = lessons.map(

        lesson=>lesson.id

    );



    const {data:completed}=await supabase
        .from("lesson_progress")
        .select("course_outline_id")
        .eq("student_id",studentId)
        .eq("completed",true)
        .in(
            "course_outline_id",
            lessonIds
        );



    return completed?.length === lessonIds.length;


}
