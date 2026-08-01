import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function addQuestion(formData:FormData){

    "use server";

    const supabase = await createClient();

    await supabase
        .from("lesson_quiz_questions")
        .insert({

            quiz_id:Number(formData.get("quiz_id")),

            question:String(formData.get("question")),

            option_a:String(formData.get("option_a")),

            option_b:String(formData.get("option_b")),

            option_c:String(formData.get("option_c")),

            option_d:String(formData.get("option_d")),

            correct_answer:String(formData.get("correct_answer")),

            marks:Number(formData.get("marks")),

            sort_order:Number(formData.get("sort_order"))

        });

    redirect(`/admin/quizzes/${formData.get("quiz_id")}/questions`);

}



export default async function QuizQuestionsPage({

    params

}:{
    params:Promise<{id:string}>
}){

    const {id}=await params;

    const quizId=Number(id);

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

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

    const {data:quiz}=await supabase
        .from("lesson_quizzes")
        .select("title")
        .eq("id",quizId)
        .single();

    const {data:questions}=await supabase
        .from("lesson_quiz_questions")
        .select("*")
        .eq("quiz_id",quizId)
        .order("sort_order");

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-5xl">

                <h1 className="text-3xl font-bold text-brand-dark">

                    {quiz?.title}

                </h1>

                <form
                    action={addQuestion}
                    className="mt-8 space-y-4 rounded-2xl bg-white p-8 shadow"
                >

                    <input
                        type="hidden"
                        name="quiz_id"
                        value={quizId}
                    />

                    <textarea
                        required
                        name="question"
                        placeholder="Question"
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        required
                        name="option_a"
                        placeholder="Option A"
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        required
                        name="option_b"
                        placeholder="Option B"
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        name="option_c"
                        placeholder="Option C"
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        name="option_d"
                        placeholder="Option D"
                        className="w-full rounded-xl border p-3"
                    />

                    <select
                        required
                        name="correct_answer"
                        className="w-full rounded-xl border p-3"
                    >

                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>

                    </select>

                    <div className="grid gap-4 md:grid-cols-2">

                        <input
                            type="number"
                            name="marks"
                            defaultValue={1}
                            min={1}
                            className="rounded-xl border p-3"
                        />

                        <input
                            type="number"
                            name="sort_order"
                            defaultValue={1}
                            min={1}
                            className="rounded-xl border p-3"
                        />

                    </div>

                    <button
                        className="rounded-xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"
                    >

                        Add Question

                    </button>

                </form>

                <div className="mt-8 space-y-4">

                    {questions?.map((q:any)=>(

                        <div
                            key={q.id}
                            className="rounded-xl border bg-white p-6 shadow"
                        >

                            <h2 className="font-bold">

                                {q.sort_order}. {q.question}

                            </h2>

                            <p className="mt-2">A. {q.option_a}</p>
                            <p>B. {q.option_b}</p>

                            {q.option_c && <p>C. {q.option_c}</p>}
                            {q.option_d && <p>D. {q.option_d}</p>}

                            <p className="mt-3 text-sm text-brand-primary">

                                Correct Answer: {q.correct_answer}

                            </p>

                            <p className="text-sm text-slate-600">

                                Marks: {q.marks}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </main>

    );

}
