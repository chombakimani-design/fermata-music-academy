"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function assignCourse(formData: FormData) {

    const supabase = await createClient();

    const tutorId = String(formData.get("tutorId"));
    const courseId = Number(formData.get("courseId"));

    const { data: existing } = await supabase
        .from("tutor_courses")
        .select("id")
        .eq("tutor_id", tutorId)
        .eq("course_id", courseId)
        .maybeSingle();

    if (!existing) {

        await supabase
            .from("tutor_courses")
            .insert({
                tutor_id: tutorId,
                course_id: courseId
            });

    }

    redirect(`/admin/assignments/${tutorId}`);

}
