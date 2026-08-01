"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function finalizeQuiz(

    quizId:number,

    studentId:string,

    percentage:number,

    passed:boolean

){

    const supabase=await createClient();

    const {data:quiz}=await supabase

        .from("lesson_quizzes")

        .select("lesson_id")

        .eq("id",quizId)

        .single();

    if(!quiz){

        redirect("/student/my-courses");

    }

    if(passed){

        await supabase

            .from("lesson_progress")

            .upsert({

                student_id:studentId,

                lesson_id:quiz.lesson_id,

                completed:true,

                completed_at:new Date().toISOString()

            });

        const {data:lesson}=await supabase

            .from("course_outlines")

            .select("course_id")

            .eq("id",quiz.lesson_id)

            .single();

        if(lesson){

            const {count:totalLessons}=await supabase

                .from("course_outlines")

                .select("*",{

                    count:"exact",

                    head:true

                })

                .eq("course_id",lesson.course_id);

            const {count:completedLessons}=await supabase

                .from("lesson_progress")

                .select("*",{

                    count:"exact",

                    head:true

                })

                .eq("student_id",studentId)

                .eq("completed",true);

            if(

                totalLessons &&

                completedLessons &&

                completedLessons>=totalLessons

            ){

                await supabase

                    .from("student_courses")

                    .update({

                        completed:true,

                        completed_at:new Date().toISOString()

                    })

                    .eq("student_id",studentId)

                    .eq("course_id",lesson.course_id);

            }

        }

    }

}
