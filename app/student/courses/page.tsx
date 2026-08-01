import Link from "next/link";
import Logo from "@/components/branding/Logo";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function CoursesPage() {

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
        .from("courses")
        .select("*")
        .eq(
            "active",
            true
        )
        .order("id");



    return (

        <main className="min-h-screen bg-brand-light p-4 md:p-6">


            <div className="mx-auto max-w-6xl">


                <div className="rounded-2xl border border-brand-gold bg-white p-5 shadow-xl md:p-8">


                    <div className="flex justify-center">

                        <Logo
                            width={180}
                            height={80}
                        />

                    </div>


                    <div className="mt-5 h-px bg-brand-gold"/>


                    <h1 className="mt-8 text-3xl font-bold text-brand-dark md:text-4xl">

                        Available Courses

                    </h1>


                    <p className="mt-3 text-sm text-slate-600 md:text-base">

                        Explore music programmes available at Fermata Music Academy.

                    </p>


                </div>



                {!courses || courses.length===0 ? (

                    <div className="mt-8 rounded-2xl border border-brand-gold bg-white p-8 text-center shadow">

                        <p className="text-slate-600">

                            No courses are currently available.

                        </p>

                    </div>

                ) : (


                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">



                        {courses.map((course)=>(


                            <div

                                key={course.id}

                                className="flex flex-col rounded-2xl border border-brand-gold bg-white p-5 shadow-lg md:p-6"

                            >


                                <h2 className="text-xl font-bold text-brand-primary md:text-2xl">

                                    {course.course_name}

                                </h2>



                                <p className="mt-3 line-clamp-4 text-sm text-slate-600 md:text-base">

                                    {course.description}

                                </p>




                                <div className="mt-6 space-y-3">


                                    <div className="rounded-lg bg-brand-light p-3 md:p-4">

                                        <p className="text-sm text-slate-500">

                                            Duration

                                        </p>

                                        <p className="font-bold text-brand-dark">

                                            {course.duration}

                                        </p>

                                    </div>




                                    <div className="rounded-lg bg-brand-light p-3 md:p-4">

                                        <p className="text-sm text-slate-500">

                                            Level

                                        </p>

                                        <p className="font-bold text-brand-dark">

                                            {course.level}

                                        </p>

                                    </div>




                                    <div className="rounded-lg border border-brand-gold p-3 md:p-4">

                                        <p className="text-sm text-slate-500">

                                            Course Fee

                                        </p>

                                        <p className="text-xl font-black text-brand-gold md:text-2xl">

                                            KES {course.fee}

                                        </p>

                                    </div>


                                </div>




                                <Link

                                    href={`/student/courses/${course.id}`}

                                    className="mt-6 block w-full rounded-xl bg-brand-primary p-3 text-center font-bold text-white shadow hover:bg-brand-dark md:p-4"

                                >

                                    View Course

                                </Link>



                            </div>


                        ))}


                    </div>


                )}


            </div>


        </main>

    );

}
