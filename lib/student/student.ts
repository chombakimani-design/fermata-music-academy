import { createClient } from "@/lib/supabase/server";

export async function getStudentProfile(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("profiles")
        .select("first_name,last_name,student_id,phone,role")
        .eq("id", userId)
        .single();

    if (error) throw error;

    return data;
}

export async function getStudentCourses(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("student_courses")
        .select(`
            id,
            course_id,
            payment_status,
            competence_level,
            availability,
            enrolled_at,
            courses(
                course_name,
                description,
                duration,
                fee,
                level,
                tutor_courses(
                    profiles(
                        first_name,
                        last_name,
                        auth_email
                    )
                )
            )
        `)
        .eq("student_id", userId)
        .order("enrolled_at", { ascending: false });

    if (error) throw error;

    return data ?? [];
}

export async function getTutorAssignment(userId: string) {
    const supabase = await createClient();

    const { data: link } = await supabase
        .from("tutor_students")
        .select("tutor_id")
        .eq("student_id", userId)
        .maybeSingle();

    if (!link) return null;

    const { data } = await supabase
        .from("profiles")
        .select("first_name,last_name,auth_email")
        .eq("id", link.tutor_id)
        .maybeSingle();

    return data;
}
