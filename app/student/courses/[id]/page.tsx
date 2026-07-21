import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EnrollPage({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;


    const supabase = await createClient();


    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();



    if (!user) {

        redirect("/auth/login");

    }



    const { data: course } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();



    const { data: existingEnrollment } = await supabase
        .from("student_courses")
        .select(`
            id,
            payment_status
        `)
        .eq("student_id", user.id)
        .eq("course_id", Number(id))
        .maybeSingle();



    async function enroll(formData: FormData) {

        "use server";


        const supabase = await createClient();



        const {
            data: {
                user
            }
        } = await supabase.auth.getUser();



        if (!user) {

            redirect("/auth/login");

        }



        const { data: alreadyEnrolled } =
            await supabase
                .from("student_courses")
                .select("id")
                .eq("student_id", user.id)
                .eq("course_id", Number(id))
                .maybeSingle();



        if (alreadyEnrolled) {

            redirect("/student/my-courses");

        }



        const { error } = await supabase
            .from("student_courses")
            .insert({

                student_id: user.id,

                course_id: Number(id),

                competence_level:
                    String(
                        formData.get("competence_level")
                    ),

                availability:
                    String(
                        formData.get("availability")
                    ),

                payment_method: "M-Pesa",

                payment_status: "Pending"

            });



        if (error) {

            throw new Error(error.message);

        }



        redirect("/student/my-courses");

    }



    return (

        <main className="mx-auto max-w-xl p-10">


            <h1 className="text-4xl font-bold text-[#0B3C88]">

                Enroll: {course?.course_name}

            </h1>



            <p className="mt-4 text-slate-700">

                {course?.description}

            </p>



            {existingEnrollment ? (


                <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6">


                    <h2 className="text-2xl font-bold text-green-700">

                        ✓ Already Enrolled

                    </h2>



                    <p className="mt-3 text-slate-900">

                        Payment Status:
                        {" "}
                        {existingEnrollment.payment_status}

                    </p>



                    <a
                        href="/student/my-courses"
                        className="mt-6 inline-block rounded-lg bg-[#0B3C88] px-6 py-3 font-bold text-white"
                    >

                        View My Courses

                    </a>


                </div>


            ) : (


                <form
                    action={enroll}
                    className="mt-8 space-y-5 rounded-xl bg-white p-6 shadow"
                >


                    <label className="block font-semibold text-slate-900">

                        Competence Level

                    </label>


                    <select
                        name="competence_level"
                        required
                        className="w-full rounded-lg border p-4 text-slate-900"
                    >

                        <option value="">
                            Select Level
                        </option>

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



                    <label className="block font-semibold text-slate-900">

                        Availability

                    </label>


                    <select
                        name="availability"
                        className="w-full rounded-lg border p-4 text-slate-900"
                    >

                        <option value="Morning">
                            Morning
                        </option>

                        <option value="Afternoon">
                            Afternoon
                        </option>

                        <option value="Evening">
                            Evening
                        </option>


                    </select>



                    <label className="block font-semibold text-slate-900">

                        Payment Method

                    </label>


                    <input
                        value="M-Pesa"
                        readOnly
                        className="w-full rounded-lg border bg-slate-100 p-4 text-slate-900"
                    />



                    <button
                        className="w-full rounded-lg bg-[#0B3C88] p-4 font-bold text-white hover:bg-blue-900"
                    >

                        Confirm Enrollment

                    </button>


                </form>


            )}


        </main>

    );

}
