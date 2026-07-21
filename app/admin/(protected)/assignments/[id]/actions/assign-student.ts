"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function assignStudent(formData: FormData) {

    const tutorId = String(formData.get("tutorId"));
    const studentId = String(formData.get("studentId"));

    console.log("Tutor ID:", tutorId);
    console.log("Student ID:", studentId);

    const supabase = await createClient();

    const {
        data:{ user }
    } = await supabase.auth.getUser();

    if(!user){

        redirect("/admin/login");

    }

    const { data:existing, error:existingError } = await supabase
        .from("tutor_students")
        .select("*")
        .eq("tutor_id", tutorId)
        .eq("student_id", studentId)
        .maybeSingle();

    console.log("Existing:", existing);
    console.log("Existing Error:", existingError);

    if(!existing){

        const { data, error } = await supabase
            .from("tutor_students")
            .insert({
                tutor_id: tutorId,
                student_id: studentId
            })
            .select();

        console.log("Inserted:", data);
        console.log("Insert Error:", error);

    } else {

        console.log("Assignment already exists.");

    }

    redirect(`/admin/assignments/${tutorId}`);

}
