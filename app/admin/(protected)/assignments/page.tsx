import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AssignmentsPage() {

    const supabase = await createClient();

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();

    if (!user) {

        redirect("/admin/login");

    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (
        !profile ||
        (
            profile.role !== "admin" &&
            profile.role !== "super_admin"
        )
    ) {

        redirect("/admin/login");

    }

    const { data: tutors } = await supabase
        .from("profiles")
        .select(`
            id,
            first_name,
            last_name,
            auth_email
        `)
        .eq("role", "tutor")
        .order("first_name");

    return (

        <main>

            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow">

                <h1 className="text-4xl font-bold text-brand-dark">
                    Tutor Assignments
                </h1>

                <p className="mt-3 text-slate-600">
                    Assign students and courses to tutors.
                </p>

            </div>

            <div className="mt-8 rounded-xl bg-white p-6 shadow">

                <div className="space-y-4">

                    {tutors?.map((tutor) => (

                        <div
                            key={tutor.id}
                            className="flex items-center justify-between rounded-lg border border-brand-gold p-5"
                        >

                            <div>

                                <p className="text-xl font-bold">
                                    {tutor.first_name} {tutor.last_name}
                                </p>

                                <p className="text-slate-600">
                                    {tutor.auth_email}
                                </p>

                            </div>

                            <Link
                                href={`/admin/assignments/${tutor.id}`}
                                className="rounded-lg bg-brand-primary px-5 py-3 font-bold text-white"
                            >
                                Manage
                            </Link>

                        </div>

                    ))}

                    {tutors?.length === 0 && (

                        <p className="text-slate-500">
                            No tutors found.
                        </p>

                    )}

                </div>

            </div>

        </main>

    );

}
