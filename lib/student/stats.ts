import { createClient } from "@/lib/supabase/server";


export async function getStudentLearningStats(

    studentId:string

){


    const supabase = await createClient();



    const {data:courses}=await supabase
        .from("student_courses")
        .select("course_id")
        .eq("student_id",studentId);



    const courseIds = courses?.map(
        course=>course.course_id
    ) || [];



    if(courseIds.length===0){

        return {

            courses:0,
            lessons:0,
            completed:0,
            percentage:0

        };

    }



    const {data:lessons}=await supabase
        .from("course_outlines")
        .select("id")
        .in("course_id",courseIds);



    const lessonIds = lessons?.map(
        lesson=>lesson.id
    ) || [];



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



    return {

        courses:courseIds.length,

        lessons:lessonIds.length,

        completed,

        percentage: lessonIds.length===0
        ? 0
        : Math.round(
            (completed / lessonIds.length) * 100
        )

    };

}
