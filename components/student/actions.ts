"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export async function completeLesson(formData:FormData){


    const supabase = await createClient();



    const {
        data:{user}
    } = await supabase.auth.getUser();



    if(!user){

        redirect("/auth/login");

    }



    const lessonId = Number(
        formData.get("lesson_id")
    );



    const {data:lesson}=await supabase
        .from("course_outlines")
        .select(`
            course_id,
            sort_order
        `)
        .eq("id",lessonId)
        .single();



    await supabase
        .from("lesson_progress")
        .update({

            completed:true,

            completed_at:new Date().toISOString(),

            last_viewed_at:new Date().toISOString(),

            progress_percent:100

        })
        .eq("student_id",user.id)
        .eq("course_outline_id",lessonId);



    if(lesson){


        const {data:nextLesson}=await supabase
            .from("course_outlines")
            .select("id")
            .eq("course_id",lesson.course_id)
            .gt("sort_order",lesson.sort_order)
            .order("sort_order",{ascending:true})
            .limit(1)
            .single();



        if(nextLesson){

            redirect(
                `/student/lessons/${nextLesson.id}`
            );

        }


    }



    redirect("/student/my-courses");

}
