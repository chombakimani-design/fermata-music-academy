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



    await supabase
        .from("lesson_progress")
        .upsert({

            student_id:user.id,

            course_outline_id:lessonId,

            completed:true,

            completed_at:new Date().toISOString(),

            last_viewed_at:new Date().toISOString(),

            progress_percent:100

        },
        {
            onConflict:"student_id,course_outline_id"
        });



    redirect(`/student/lessons/${lessonId}`);

}
