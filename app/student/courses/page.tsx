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

        <main className="min-h-screen bg-brand-light p-6">


            <div className="mx-auto max-w-6xl">



                <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">


                    <div className="flex justify-center">

                        <Logo
                            width={180}
                            height={80}
                        />

                    </div>



                    <div className="mt-5 h-px bg-brand-gold"/>



                    <h1 className="mt-8 text-4xl font-bold text-brand-dark">

                        Available Courses

                    </h1>



                    <p className="mt-3 text-slate-600">

                        Explore music programmes available at Fermata Music Academy.

                    </p>


                </div>





                <div className="mt-8 grid gap-6 md:grid-cols-2">



                    {courses?.map((course)=>(


                        <div

                            key={course.id}

                            className="rounded-2xl border border-brand-gold bg-white p-8 shadow-lg"

                        >



                            <h2 className="text-2xl font-bold text-brand-primary">

                                {course.course_name}

                            </h2>



                            <p className="mt-3 text-slate-600">

                                {course.description}

                            </p>




                            <div className="mt-6 space-y-3">


                                <div className="rounded-lg bg-brand-light p-4">

                                    <p className="text-sm text-slate-500">
                                        Duration
                                    </p>

                                    <p className="font-bold text-brand-dark">
                                        {course.duration}
                                    </p>

                                </div>




                                <div className="rounded-lg bg-brand-light p-4">

                                    <p className="text-sm text-slate-500">
                                        Level
                                    </p>

                                    <p className="font-bold text-brand-dark">
                                        {course.level}
                                    </p>

                                </div>




                                <div className="rounded-lg border border-brand-gold p-4">

                                    <p className="text-sm text-slate-500">
                                        Course Fee
                                    </p>

                                    <p className="text-2xl font-black text-brand-gold">

                                        KES {course.fee}

                                    </p>

                                </div>



                            </div>





                            <Link

                                href={`/student/courses/${course.id}`}

                                className="mt-6 inline-block w-full rounded-xl bg-brand-primary p-4 text-center font-bold text-white shadow hover:bg-brand-dark"

                            >

                                View Course

                            </Link>



                        </div>


                    ))}



                </div>



            </div>


        </main>

    );


}
