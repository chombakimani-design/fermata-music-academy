import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminCoursesPage() {

    const supabase = await createClient();


    const { data: courses } = await supabase
        .from("courses")
        .select(`
            id,
            course_name,
            description,
            duration,
            fee,
            level
        `)
        .order("id", {
            ascending: true
        });



    return (

        <main>


            <div className="flex items-center justify-between">


                <div>

                    <h1 className="text-4xl font-bold text-[#0B3C88]">

                        Manage Courses

                    </h1>


                    <p className="mt-2 text-slate-700">

                        Manage Fermata Music Academy courses.

                    </p>

                </div>



                <Link
                    href="/admin/courses/new"
                    className="rounded-lg bg-[#0B3C88] px-5 py-3 font-bold text-white"
                >

                    + Add Course

                </Link>


            </div>



            <div className="mt-8 grid gap-6 md:grid-cols-2">


                {courses?.map((course) => (


                    <div
                        key={course.id}
                        className="rounded-xl bg-white p-6 shadow"
                    >


                        <h2 className="text-2xl font-bold text-slate-900">

                            {course.course_name}

                        </h2>



                        <p className="mt-2 text-slate-700">

                            {course.description}

                        </p>



                        <div className="mt-4 space-y-2 text-slate-900">


                            <p>
                                Duration:
                                {" "}
                                {course.duration}
                            </p>


                            <p>
                                Level:
                                {" "}
                                {course.level}
                            </p>


                            <p>
                                Fee:
                                {" "}
                                KES {course.fee}
                            </p>


                        </div>



                        <Link
                            href={`/admin/courses/${course.id}`}
                            className="mt-5 inline-block rounded-lg bg-slate-800 px-5 py-3 font-bold text-white"
                        >

                            Manage

                        </Link>


                    </div>


                ))}



                {courses?.length === 0 && (

                    <div className="rounded-xl bg-white p-6 text-slate-700 shadow">

                        No courses available.

                    </div>

                )}


            </div>


        </main>

    );

}
