"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function removeStudent(formData: FormData) {

    const assignmentId = Number(
        formData.get("assignmentId")
    );

    const tutorId = String(
        formData.get("tutorId")
    );

    const supabase = await createClient();

    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();

    if(!user){

        redirect("/admin/login");

    }

    const { data:profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if(
        !profile ||
        (
            profile.role !== "admin" &&
            profile.role !== "super_admin"
        )
    ){

        redirect("/admin/login");

    }

    await supabase
        .from("tutor_students")
        .delete()
        .eq("id", assignmentId);

    redirect(`/admin/assignments/${tutorId}`);

}
