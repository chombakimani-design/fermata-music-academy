import Link from "next/link";
import Logo from "@/components/branding/Logo";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
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

    return (

        <div className="min-h-screen bg-brand-light md:flex">

            <aside className="w-full bg-brand-dark p-6 text-white md:min-h-screen md:w-72">

                <div className="flex flex-col items-center">

                    <Logo
                        width={170}
                        height={75}
                    />

                    <div className="mt-4 h-px w-full bg-brand-gold" />

                    <p className="mt-4 text-sm text-blue-100">
                        Administration Portal
                    </p>

                </div>

                <nav className="mt-8 space-y-2">

                    <Link
                        href="/admin/dashboard"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        🏠 Dashboard
                    </Link>

                    <Link
                        href="/admin/students"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        👨‍🎓 Manage Students
                    </Link>

                    <Link
                        href="/admin/tutors"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        👨‍🏫 Manage Tutors
                    </Link>

                    <Link
                        href="/admin/assignments"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        🔗 Tutor Assignments
                    </Link>

                    <Link
                        href="/admin/courses"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        📚 Manage Courses
                    </Link>

                    <Link
                        href="/admin/payments"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        💳 Verify Payments
                    </Link>

                    <Link
                        href="/admin/receipts"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        🧾 Receipts
                    </Link>

                    <Link
                        href="/admin/reports"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        📊 Reports
                    </Link>

                    <Link
                        href="/admin/settings"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        ⚙️ Settings
                    </Link>

                </nav>

            </aside>

            <section className="flex-1 p-8">

                {children}

            </section>

        </div>

    );
}



