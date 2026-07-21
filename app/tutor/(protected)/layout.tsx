import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function TutorLayout({
    children
}:{
    children: React.ReactNode
}) {

    const supabase = await createClient();

    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();

    if(!user){

        redirect("/tutor/login");

    }

    const { data:profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id",user.id)
        .single();

    if(
        !profile ||
        profile.role !== "tutor"
    ){

        redirect("/tutor/login");

    }

    return children;

}
