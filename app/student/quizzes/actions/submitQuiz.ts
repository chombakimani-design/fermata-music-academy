"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { finalizeQuiz } from "./finalizeQuiz";

export async function submitQuiz(formData:FormData){

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

    if(!user){

        redirect("/auth/login");

    }

    const quizId=Number(formData.get("quiz_id"));

    const {data:quiz}=await supabase

        .from("lesson_quizzes")

        .select(`
            id,
            pass_mark
        `)

        .eq("id",quizId)

        .single();

    if(!quiz){

        redirect("/student/my-courses");

    }

    const {data:questions}=await supabase

        .from("lesson_quiz_questions")

        .select(`
            id,
            correct_answer,
            marks
        `)

        .eq("quiz_id",quizId);

    let score=0;

    let totalMarks=0;

    const answerRows:any[]=[];

    for(const question of questions ?? []){

        totalMarks+=question.marks;

        const selected=String(

            formData.get(`question_${question.id}`) ?? ""

        );

        const correct=

            selected===question.correct_answer;

        const awarded=

            correct

            ?question.marks

            :0;

        score+=awarded;

        answerRows.push({

            question_id:question.id,

            selected_answer:selected,

            is_correct:correct,

            marks_awarded:awarded

        });

    }

    const percentage=

        totalMarks===0

        ?0

        :Number(

            (

                score/

                totalMarks*

                100

            ).toFixed(2)

        );

    const passed=

        percentage>=quiz.pass_mark;

    const {data:attempt,error:attemptError}=await supabase

        .from("lesson_quiz_attempts")

        .insert({

            quiz_id:quiz.id,

            student_id:user.id,

            score,

            percentage,

            passed,

            submitted_at:new Date().toISOString()

        })

        .select()

        .single();

    if(attemptError || !attempt){

        throw new Error(

            attemptError?.message ??

            "Unable to save quiz attempt."

        );

    }

    await supabase

        .from("lesson_quiz_answers")

        .insert(

            answerRows.map(answer=>({

                ...answer,

                attempt_id:attempt.id

            }))

        );

    await finalizeQuiz(

        quiz.id,

        user.id,

        percentage,

        passed

    );

    redirect(

        `/student/quizzes/results/${attempt.id}`

    );

}
