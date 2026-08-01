import { createClient } from "@/lib/supabase/server";

export async function getNextLesson(
    userId:string,
    courseId:number
){

    const supabase = await createClient();


    const {data:lessons}=await supabase
        .from("course_outlines")
        .select(`
            id,
            title,
            sort_order
        `)
        .eq("course_id",courseId)
        .order("sort_order",{
            ascending:true
        });



    if(!lessons || lessons.length===0){
        return null;
    }



    const {data:progress}=await supabase
        .from("lesson_progress")
        .select(`
            course_outline_id,
            completed
        `)
        .eq("student_id",userId);



    const completed = new Set(
        progress
        ?.filter(item=>item.completed)
        .map(item=>item.course_outline_id)
    );



    return lessons.find(
        lesson=>!completed.has(lesson.id)
    ) ?? lessons[lessons.length-1];

}
