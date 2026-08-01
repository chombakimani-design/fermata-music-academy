import { createClient } from "@/lib/supabase/server";


export async function getCourseProgress(
    studentId:string,
    courseId:number
){

    const supabase = await createClient();



    const {data:lessons}=await supabase
        .from("course_outlines")
        .select(`
            id
        `)
        .eq("course_id",courseId);



    if(!lessons || lessons.length===0){

        return {
            total:0,
            completed:0,
            percentage:0
        };

    }



    const lessonIds = lessons.map(
        lesson=>lesson.id
    );



    const {data:progress}=await supabase
        .from("lesson_progress")
        .select(`
            course_outline_id,
            completed
        `)
        .eq("student_id",studentId)
        .in("course_outline_id",lessonIds);



    const completed = progress?.filter(
        item=>item.completed
    ).length || 0;



    const total = lessons.length;



    return {

        total,

        completed,

        percentage: Math.round(
            (completed / total) * 100
        )

    };

}
