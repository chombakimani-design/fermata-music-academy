"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";


export async function login(formData: FormData) {

    const supabase = await createClient();


    const studentId = String(
        formData.get("student_id") ?? ""
    )
    .trim()
    .toUpperCase();


    const password = String(
        formData.get("password") ?? ""
    );


    const { data: authEmail, error: profileError } = await supabase
        .rpc(
            "get_auth_email_by_student_id",
            {
                sid: studentId
            }
        );


    if (profileError || !authEmail) {

        throw new Error("Invalid Student ID");

    }


    const { error } = await supabase.auth.signInWithPassword({

        email: authEmail,

        password,

    });


    if (error) {

        throw new Error(error.message);

    }


    redirect("/student");

}
