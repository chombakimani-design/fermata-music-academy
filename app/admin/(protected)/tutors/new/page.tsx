import { redirect } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export default async function NewTutorPage() {

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
            profile.role !== "super_admin" &&
            profile.role !== "admin"
        )
    ) {

        redirect("/admin/login");

    }

    async function createTutor(formData: FormData) {

        "use server";

        const admin = createAdminClient();

        const firstName = String(formData.get("first_name") ?? "").trim();
        const lastName = String(formData.get("last_name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim().toLowerCase();
        const password = String(formData.get("password") ?? "");

        const result = await admin.auth.admin.createUser({

            email,
            password,
            email_confirm: true,

            user_metadata: {
                first_name: firstName,
                last_name: lastName
            }

        });

        console.log("CREATE USER RESULT:");
        console.dir(result, { depth: null });

        if (result.error) {

            throw new Error(result.error.message);

        }

        const updateResult = await admin
            .from("profiles")
            .update({

                first_name: firstName,
                last_name: lastName,
                auth_email: email,
                role: "tutor"

            })
            .eq("id", result.data.user.id)
            .select();

        console.log("PROFILE UPDATE RESULT:");
        console.dir(updateResult, { depth: null });

        redirect("/admin/tutors");

    }

    return (

        <main className="mx-auto max-w-2xl">

            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">

                <h1 className="text-4xl font-bold text-brand-dark">
                    Create Tutor
                </h1>

                <div className="mt-4 h-1 w-32 rounded-full bg-brand-gold" />

                <form
                    action={createTutor}
                    className="mt-8 space-y-5"
                >

                    <input
                        name="first_name"
                        placeholder="First Name"
                        required
                        className="w-full rounded-lg border p-4"
                    />

                    <input
                        name="last_name"
                        placeholder="Last Name"
                        required
                        className="w-full rounded-lg border p-4"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Tutor Email"
                        required
                        className="w-full rounded-lg border p-4"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Temporary Password"
                        required
                        className="w-full rounded-lg border p-4"
                    />

                    <button
                        className="w-full rounded-lg bg-brand-primary p-4 font-bold text-white"
                    >
                        Create Tutor
                    </button>

                </form>

            </div>

        </main>

    );

}
