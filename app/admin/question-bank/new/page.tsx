import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function NewQuestionPage(){

    async function createQuestion(formData:FormData){

        "use server";

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

        const {error}=await supabase
            .from("question_bank")
            .insert({

                title:String(formData.get("title")),

                question:String(formData.get("question")),

                option_a:String(formData.get("option_a")),

                option_b:String(formData.get("option_b")),

                option_c:String(formData.get("option_c") ?? ""),

                option_d:String(formData.get("option_d") ?? ""),

                correct_answer:String(formData.get("correct_answer")),

                marks:Number(formData.get("marks") ?? 1),

                category:String(formData.get("category") ?? ""),

                difficulty:String(formData.get("difficulty") ?? "Medium"),

                created_by:user.id

            });

        if(error){

            throw new Error(error.message);

        }

        redirect("/admin/question-bank");

    }

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

                <h1 className="text-3xl font-bold text-brand-dark">

                    New Question

                </h1>

                <form
                    action={createQuestion}
                    className="mt-8 space-y-5"
                >

                    <input
                        name="title"
                        placeholder="Question title"
                        required
                        className="w-full rounded-xl border p-3"
                    />

                    <textarea
                        name="question"
                        placeholder="Question"
                        required
                        rows={4}
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        name="option_a"
                        placeholder="Option A"
                        required
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        name="option_b"
                        placeholder="Option B"
                        required
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
                        name="correct_answer"
                        required
                        className="w-full rounded-xl border p-3"
                    >

                        <option value="">Select Correct Answer</option>

                        <option value="A">Option A</option>

                        <option value="B">Option B</option>

                        <option value="C">Option C</option>

                        <option value="D">Option D</option>

                    </select>

                    <input
                        type="number"
                        name="marks"
                        defaultValue={1}
                        min={1}
                        required
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        className="w-full rounded-xl border p-3"
                    />

                    <select
                        name="difficulty"
                        defaultValue="Medium"
                        className="w-full rounded-xl border p-3"
                    >

                        <option value="Easy">Easy</option>

                        <option value="Medium">Medium</option>

                        <option value="Hard">Hard</option>

                    </select>

                    <button
                        type="submit"
                        className="rounded-xl bg-brand-primary px-8 py-3 font-bold text-white hover:bg-brand-dark"
                    >

                        Save Question

                    </button>

                </form>

            </div>

        </main>

    );

}
