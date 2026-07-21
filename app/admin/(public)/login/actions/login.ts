"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {

    const supabase = await createClient();

    const email = String(
        formData.get("email") ?? ""
    ).trim().toLowerCase();

    const password = String(
        formData.get("password") ?? ""
    );

    const { error } = await supabase.auth.signInWithPassword({

        email,
        password

    });

    if (error) {

        throw new Error(error.message);

    }

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();

    if (!user) {

        throw new Error("Authentication failed.");

    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (
        !profile ||
        (
            profile.role !== "super_admin" &&
            profile.role !== "admin"
        )
    ) {

        await supabase.auth.signOut();

        throw new Error("Unauthorized access.");

    }

    redirect("/admin/dashboard");

}
