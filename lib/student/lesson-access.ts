import { createClient } from "@/lib/supabase/server";


export async function canAccessLesson(

    studentId:string,

    lessonId:number

){


    const supabase = await createClient();



    const {data:lesson}=await supabase
        .from("course_outlines")
        .select(`
            course_id,
            sort_order
        `)
        .eq("id",lessonId)
        .single();



    if(!lesson){

        return false;

    }



    const {data:previousLessons}=await supabase
        .from("course_outlines")
        .select("id")
        .eq("course_id",lesson.course_id)
        .lt("sort_order",lesson.sort_order);



    if(!previousLessons || previousLessons.length===0){

        return true;

    }



    const previousIds = previousLessons.map(
        item=>item.id
    );



    const {data:completed}=await supabase
        .from("lesson_progress")
        .select("course_outline_id")
        .eq("student_id",studentId)
        .eq("completed",true)
        .in(
            "course_outline_id",
            previousIds
        );



    return completed?.length === previousIds.length;


}
