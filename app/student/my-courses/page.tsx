import Link from "next/link";
import Logo from "@/components/branding/Logo";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function MyCoursesPage() {


    const supabase = await createClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();



    if(!user){

        redirect("/auth/login");

    }



    const { data:courses } = await supabase
        .from("student_courses")
        .select(`
            id,
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
        .eq(
            "student_id",
            user.id
        )
        .order(
            "enrolled_at",
            {
                ascending:false
            }
        );



    return (

        <main className="min-h-screen bg-brand-light p-6">


            <div className="mx-auto max-w-5xl">


                <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">


                    <div className="flex justify-center">

                        <Logo
                            width={180}
                            height={80}
                        />

                    </div>


                    <div className="mt-5 h-px bg-brand-gold"/>


                    <h1 className="mt-8 text-4xl font-bold text-brand-dark">

                        My Courses

                    </h1>


                    <p className="mt-3 text-slate-600">

                        Your enrolled music programmes at Fermata Music Academy.

                    </p>


                </div>



                <div className="mt-8 space-y-6">



                    {courses?.map((item:any)=>(


                        <div
                            key={item.id}
                            className="rounded-2xl border border-brand-gold bg-white p-8 shadow-lg"
                        >


                            <h2 className="text-2xl font-bold text-brand-primary">

                                {item.courses?.[0]?.course_name}

                            </h2>


                            <p className="mt-3 text-slate-700">

                                {item.courses?.[0]?.description}

                            </p>



                            <div className="mt-6 grid gap-4 md:grid-cols-2">


                                <div className="rounded-xl bg-brand-light p-4">

                                    <p className="text-sm text-slate-500">
                                        Level
                                    </p>

                                    <p className="font-bold text-brand-dark">
                                        {item.courses?.[0]?.level}
                                    </p>

                                </div>



                                <div className="rounded-xl bg-brand-light p-4">

                                    <p className="text-sm text-slate-500">
                                        Fee
                                    </p>

                                    <p className="font-bold text-brand-dark">
                                        KES {item.courses?.[0]?.fee}
                                    </p>

                                </div>



                                <div className="rounded-xl bg-brand-light p-4">

                                    <p className="text-sm text-slate-500">
                                        Tutor
                                    </p>

                                    <p className="font-bold text-brand-dark">

                                        {item.courses?.[0]?.tutor_courses?.[0]?.profiles?.[0]?.first_name}
                                        {" "}
                                        {item.courses?.[0]?.tutor_courses?.[0]?.profiles?.[0]?.last_name}

                                    </p>

                                </div>



                                <div className="rounded-xl bg-brand-light p-4">

                                    <p className="text-sm text-slate-500">
                                        Payment Status
                                    </p>

                                    <p className="font-bold text-brand-dark">
                                        {item.payment_status}
                                    </p>

                                </div>


                            </div>



                            <Link

                                href="/student/payments"

                                className="mt-6 inline-block rounded-xl bg-brand-primary px-6 py-3 font-bold text-white"

                            >

                                View Payments

                            </Link>


                        </div>


                    ))}




                    {courses?.length===0 && (

                        <div className="rounded-xl border border-brand-gold bg-white p-8 text-center shadow">

                            <p className="text-lg font-semibold text-brand-dark">

                                No courses enrolled yet.

                            </p>

                        </div>

                    )}



                </div>


            </div>


        </main>

    );


}


