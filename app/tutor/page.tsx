import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TutorPage() {

    const supabase = await createClient();

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();

    if (!user) {

        redirect("/tutor/login");

    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (
        !profile ||
        profile.role !== "tutor"
    ) {

        redirect("/tutor/login");

    }

    redirect("/tutor/dashboard");

}
