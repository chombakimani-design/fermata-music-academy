import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


async function createQuiz(formData:FormData){

    "use server";

    const supabase = await createClient();

    const lessonId = Number(formData.get("lesson_id"));

    const title = String(formData.get("title"));

    const instructions = String(formData.get("instructions"));

    const passMark = Number(formData.get("pass_mark"));

    const timeLimit = Number(formData.get("time_limit_minutes"));



    await supabase
        .from("lesson_quizzes")
        .insert({

            lesson_id:lessonId,

            title,

            instructions,

            pass_mark:passMark,

            time_limit_minutes:timeLimit

        });



    redirect("/admin/quizzes");

}



export default async function NewQuizPage(){


    const supabase = await createClient();



    const {

        data:{user}

    } = await supabase.auth.getUser();



    if(!user){

        redirect("/admin/login");

    }



    const {data:profile}=await supabase
        .from("profiles")
        .select("role")
        .eq("id",user.id)
        .single();



    if(
        profile?.role!=="admin" &&
        profile?.role!=="super_admin"
    ){

        redirect("/");

    }



    const {data:lessons}=await supabase
        .from("course_outlines")
        .select("id,title")
        .order("title");



    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">

                <h1 className="text-3xl font-bold text-brand-dark">

                    Create Quiz

                </h1>

                <form
                    action={createQuiz}
                    className="mt-8 space-y-6"
                >

                    <div>

                        <label className="font-semibold">

                            Lesson

                        </label>

                        <select
                            name="lesson_id"
                            required
                            className="mt-2 w-full rounded-xl border p-3"
                        >

                            <option value="">

                                Select Lesson

                            </option>

                            {lessons?.map((lesson:any)=>(

                                <option
                                    key={lesson.id}
                                    value={lesson.id}
                                >

                                    {lesson.title}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Quiz Title

                        </label>

                        <input
                            name="title"
                            required
                            className="mt-2 w-full rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Instructions

                        </label>

                        <textarea
                            name="instructions"
                            rows={4}
                            className="mt-2 w-full rounded-xl border p-3"
                        />

                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="font-semibold">

                                Pass Mark

                            </label>

                            <input
                                type="number"
                                name="pass_mark"
                                defaultValue={50}
                                min={0}
                                max={100}
                                className="mt-2 w-full rounded-xl border p-3"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                Time Limit (Minutes)

                            </label>

                            <input
                                type="number"
                                name="time_limit_minutes"
                                defaultValue={20}
                                min={1}
                                className="mt-2 w-full rounded-xl border p-3"
                            />

                        </div>

                    </div>

                    <button
                        className="rounded-xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"
                    >

                        Create Quiz

                    </button>

                </form>

            </div>

        </main>

    );

}
