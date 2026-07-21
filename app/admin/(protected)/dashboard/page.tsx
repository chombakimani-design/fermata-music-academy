import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {

    const supabase = await createClient();

    const { count: students } = await supabase
        .from("profiles")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq("role", "student");


    const { count: courses } = await supabase
        .from("courses")
        .select("*", {
            count: "exact",
            head: true
        });


    const { count: pendingPayments } = await supabase
        .from("payments")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq("payment_status", "Pending");


    const { data: payments } = await supabase
        .from("payments")
        .select("amount")
        .eq("payment_status", "Completed");


    const revenue =
        payments?.reduce(
            (sum, payment) =>
                sum + Number(payment.amount),
            0
        ) ?? 0;


    return (

        <main>

            <h1 className="text-4xl font-bold text-brand-dark">
                Admin Dashboard
            </h1>


            <p className="mt-2 text-slate-700">
                Fermata Music Academy overview.
            </p>



            <div className="mt-8 grid gap-6 md:grid-cols-4">


                {[
                    ["Students", students ?? 0],
                    ["Courses", courses ?? 0],
                    ["Pending Payments", pendingPayments ?? 0],
                    ["Revenue", `KES ${revenue}`]
                ].map(([title, value]) => (

                    <div
                        key={String(title)}
                        className="rounded-xl bg-white p-6 shadow"
                    >

                        <p className="font-semibold text-slate-700">
                            {title}
                        </p>


                        <p className="mt-3 text-3xl font-bold text-brand-gold">
                            {value}
                        </p>


                    </div>

                ))}


            </div>



            <div className="mt-10 rounded-xl bg-white p-8 shadow">


                <h2 className="text-2xl font-bold text-brand-dark">
                    Quick Actions
                </h2>



                <div className="mt-6 grid gap-4 md:grid-cols-2">


                    {[
                        ["/admin/students","👨‍🎓 Manage Students"],
                        ["/admin/courses","📚 Manage Courses"],
                        ["/admin/payments","💳 Verify Payments"],
                        ["/admin/reports","📊 Reports"]
                    ].map(([href,label]) => (

                        <Link
                            key={href}
                            href={href}
                            className="rounded-lg border border-brand-gold p-5 text-lg font-bold text-brand-dark hover:bg-brand-light"
                        >
                            {label}
                        </Link>

                    ))}


                </div>


            </div>


        </main>

    );

}
