"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export async function completeLesson(

    lessonId:number

){

    const supabase=await createClient();


    const {

        data:{user}

    }=await supabase.auth.getUser();


    if(!user){

        redirect("/auth/login");

    }


    await supabase

        .from("lesson_progress")

        .upsert({

            student_id:user.id,

            lesson_id:lessonId,

            completed:true,

            completed_at:new Date().toISOString()

        });


}
