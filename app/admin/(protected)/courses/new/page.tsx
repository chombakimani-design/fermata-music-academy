import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default function NewCoursePage() {


    async function createCourse(formData: FormData) {

        "use server";


        const supabase = await createClient();


        const { error } = await supabase
            .from("courses")
            .insert({

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

            });



        if (error) {

            throw new Error(error.message);

        }



        redirect("/admin/courses");

    }



    return (

        <main className="mx-auto max-w-xl">


            <h1 className="text-4xl font-bold text-[#0B3C88]">

                Add New Course

            </h1>



            <form
                action={createCourse}
                className="mt-8 space-y-5 rounded-xl bg-white p-8 shadow"
            >


                <input

                    name="course_name"

                    required

                    placeholder="Course Name"

                    className="w-full rounded-lg border p-4 text-slate-900"

                />



                <textarea

                    name="description"

                    required

                    placeholder="Course Description"

                    className="w-full rounded-lg border p-4 text-slate-900"

                />



                <input

                    name="duration"

                    required

                    placeholder="Duration e.g. 4 Weeks"

                    className="w-full rounded-lg border p-4 text-slate-900"

                />



                <input

                    name="fee"

                    type="number"

                    required

                    placeholder="Fee (KES)"

                    className="w-full rounded-lg border p-4 text-slate-900"

                />



                <select

                    name="level"

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



                <button

                    className="w-full rounded-lg bg-[#0B3C88] p-4 font-bold text-white"

                >

                    Save Course

                </button>


            </form>


        </main>

    );

}
