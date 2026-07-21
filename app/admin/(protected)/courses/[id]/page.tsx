import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";

export default async function AdminCourseDetailPage({
    params
}: {
    params: Promise<{
        id: string
    }>
}) {

    const { id } = await params;


    const supabase = await createClient();



    const { data: course } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();



    if (!course) {

        notFound();

    }



    const { data: students } = await supabase
        .from("student_courses")
        .select(`
            competence_level,
            payment_status,
            profiles!student_courses_student_id_fkey(
                student_id,
                first_name,
                last_name
            )
        `)
        .eq("course_id", Number(id));



    async function updateCourse(formData: FormData) {

        "use server";


        const supabase = await createClient();



        const { error } = await supabase
            .from("courses")
            .update({

                course_name:
                    String(formData.get("course_name")),

                description:
                    String(formData.get("description")),

                duration:
                    String(formData.get("duration")),

                fee:
                    Number(formData.get("fee")),

                level:
                    String(formData.get("level"))

            })
            .eq("id", Number(id));



        if (error) {

            throw new Error(error.message);

        }


        redirect("/admin/courses");

    }



    async function deleteCourse() {

        "use server";


        const supabase = await createClient();



        const { error } = await supabase
            .from("courses")
            .delete()
            .eq("id", Number(id));



        if (error) {

            throw new Error(error.message);

        }


        redirect("/admin/courses");

    }



    return (

        <main>


            <h1 className="text-4xl font-bold text-[#0B3C88]">

                Manage Course

            </h1>



            <form
                action={updateCourse}
                className="mt-8 rounded-xl bg-white p-8 shadow space-y-5"
            >


                <input
                    name="course_name"
                    defaultValue={course.course_name}
                    className="w-full rounded-lg border p-4 text-slate-900"
                />


                <textarea
                    name="description"
                    defaultValue={course.description}
                    className="w-full rounded-lg border p-4 text-slate-900"
                />


                <input
                    name="duration"
                    defaultValue={course.duration}
                    className="w-full rounded-lg border p-4 text-slate-900"
                />


                <input
                    name="fee"
                    type="number"
                    defaultValue={course.fee}
                    className="w-full rounded-lg border p-4 text-slate-900"
                />


                <select
                    name="level"
                    defaultValue={course.level}
                    className="w-full rounded-lg border p-4 text-slate-900"
                >

                    <option value="Beginner">
                        Beginner
                    </option>

                    <option value="Intermediate">
                        Intermediate
                    </option>

                    <option value="Advanced">
                        Advanced
                    </option>

                </select>



                <button
                    className="rounded-lg bg-[#0B3C88] px-6 py-3 font-bold text-white"
                >

                    Save Changes

                </button>


            </form>




            <form
                action={deleteCourse}
                className="mt-5"
            >

                <button
                    className="rounded-lg bg-red-700 px-6 py-3 font-bold text-white"
                >

                    Delete Course

                </button>


            </form>




            <section className="mt-10 rounded-xl bg-white p-8 shadow">


                <h2 className="text-2xl font-bold text-[#0B3C88]">

                    Enrolled Students

                </h2>



                <div className="mt-5 space-y-3">


                    {students?.map((student, index) => (

                        <div
                            key={index}
                            className="rounded-lg border p-4 text-slate-900"
                        >

                            {student.profiles?.[0]?.first_name}{" "}
                            {student.profiles?.[0]?.last_name}

                            {" - "}

                            {student.payment_status}

                        </div>

                    ))}


                </div>


            </section>


        </main>

    );

}
