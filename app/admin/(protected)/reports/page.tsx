import { createClient } from "@/lib/supabase/server";

export default async function ReportsPage() {

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



    const { count: enrollments } = await supabase
        .from("student_courses")
        .select("*", {
            count: "exact",
            head: true
        });



    const { data: completedPayments } = await supabase
        .from("payments")
        .select("amount")
        .eq("payment_status", "Completed");



    const revenue =
        completedPayments?.reduce(
            (total, payment) =>
                total + Number(payment.amount),
            0
        ) ?? 0;



    return (

        <main>


            <h1 className="text-4xl font-bold text-[#0B3C88]">

                Reports

            </h1>



            <p className="mt-2 text-slate-700">

                Fermata Music Academy performance overview.

            </p>




            <div className="mt-8 grid gap-6 md:grid-cols-4">



                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="font-semibold text-slate-700">

                        Students

                    </p>


                    <p className="mt-3 text-3xl font-bold text-[#0B3C88]">

                        {students ?? 0}

                    </p>


                </div>




                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="font-semibold text-slate-700">

                        Courses

                    </p>


                    <p className="mt-3 text-3xl font-bold text-[#0B3C88]">

                        {courses ?? 0}

                    </p>


                </div>




                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="font-semibold text-slate-700">

                        Enrollments

                    </p>


                    <p className="mt-3 text-3xl font-bold text-[#0B3C88]">

                        {enrollments ?? 0}

                    </p>


                </div>




                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="font-semibold text-slate-700">

                        Revenue

                    </p>


                    <p className="mt-3 text-3xl font-bold text-green-700">

                        KES {revenue}

                    </p>


                </div>



            </div>



            <div className="mt-10 rounded-xl bg-white p-8 shadow">


                <h2 className="text-2xl font-bold text-[#0B3C88]">

                    Payment Summary

                </h2>


                <p className="mt-4 text-slate-900">

                    Completed payments:
                    {" "}
                    {completedPayments?.length ?? 0}

                </p>


            </div>



        </main>

    );

}
