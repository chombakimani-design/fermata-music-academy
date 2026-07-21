"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createAssessment(
    studentId: string,
    formData: FormData
) {

    const supabase = await createClient();


    const { data:{ user } } = await supabase.auth.getUser();


    if (!user) {
        redirect("/tutor/login");
    }


    const assessment_number =
        Number(formData.get("assessment_number"));


    const assessment_type =
        String(formData.get("assessment_type"));


    const course_id =
        Number(formData.get("course_id"));


    const subject =
        String(formData.get("subject"));


    const assessment_date =
        String(formData.get("assessment_date"));


    const score =
        formData.get("score")
            ? Number(formData.get("score"))
            : null;


    const remarks =
        String(formData.get("remarks") || "");



    const { error } = await supabase
        .from("assessments")
        .insert({

            student_id: studentId,

            tutor_id: user.id,

            course_id,

            assessment_number,

            assessment_type,

            subject,

            assessment_date,

            score,

            remarks

        });



    if (error) {

        console.log(error);

        throw new Error(error.message);

    }


    redirect(`/tutor/students/${studentId}`);

}
