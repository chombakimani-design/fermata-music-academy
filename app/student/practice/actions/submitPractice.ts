"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function submitPractice(formData:FormData){

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

    if(!user){

        redirect("/auth/login");

    }

    const questionIds=String(

        formData.get("question_ids") ?? ""

    )
    .split(",")
    .filter(Boolean)
    .map(Number);

    const {data:questions,error}=await supabase

        .from("question_bank")

        .select(`
            id,
            correct_answer,
            marks
        `)

        .in("id",questionIds);

    if(error){

        throw new Error(error.message);

    }

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

            ? question.marks

            : 0;

        score+=awarded;

        answerRows.push({

            question_bank_id:question.id,

            selected_answer:selected,

            correct_answer:question.correct_answer,

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

    const {data:attempt,error:attemptError}=await supabase

        .from("practice_attempts")

        .insert({

            student_id:user.id,

            score,

            total_marks:totalMarks,

            percentage

        })

        .select()

        .single();

    if(attemptError || !attempt){

        throw new Error(

            attemptError?.message ??

            "Unable to save practice attempt."

        );

    }

    await supabase

        .from("practice_attempt_answers")

        .insert(

            answerRows.map(answer=>({

                ...answer,

                practice_attempt_id:attempt.id

            }))

        );

    redirect(

        `/student/practice/results/${attempt.id}`

    );

}
