import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function QuizQuestionBankPage({

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

    async function addQuestion(formData:FormData){

        "use server";

        const supabase=await createClient();

        const quizId=Number(formData.get("quiz_id"));

        const questionId=Number(formData.get("question_id"));

        const sortOrder=Number(formData.get("sort_order") ?? 1);

        const {error}=await supabase

            .from("quiz_question_bank")

            .insert({

                quiz_id:quizId,

                question_bank_id:questionId,

                sort_order:sortOrder

            });

        if(error){

            throw new Error(error.message);

        }

        redirect(`/admin/quizzes/${quizId}/question-bank`);

    }

    const {data:quiz}=await supabase

        .from("lesson_quizzes")

        .select("title")

        .eq("id",quizId)

        .single();

    const {data:questions}=await supabase

        .from("question_bank")

        .select("id,title,category,difficulty,marks")

        .order("title");

    const {data:selected}=await supabase

        .from("quiz_question_bank")

        .select(`
            id,
            sort_order,
            question_bank(
                id,
                title,
                category
            )
        `)

        .eq("quiz_id",quizId)

        .order("sort_order");

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-7xl">

                <h1 className="text-4xl font-bold text-brand-dark">

                    {quiz?.title}

                </h1>

                <p className="mt-2 text-slate-600">

                    Attach questions from the Question Bank.

                </p>

                <form
                    action={addQuestion}
                    className="mt-8 rounded-2xl bg-white p-6 shadow space-y-5"
                >

                    <input
                        type="hidden"
                        name="quiz_id"
                        value={quizId}
                    />

                    <select
                        name="question_id"
                        required
                        className="w-full rounded-xl border p-3"
                    >

                        <option value="">

                            Select Question

                        </option>

                        {questions?.map((question:any)=>(

                            <option
                                key={question.id}
                                value={question.id}
                            >

                                {question.title} | {question.category} | {question.difficulty}

                            </option>

                        ))}

                    </select>

                    <input
                        type="number"
                        name="sort_order"
                        defaultValue={1}
                        min={1}
                        className="w-full rounded-xl border p-3"
                    />

                    <button
                        type="submit"
                        className="rounded-xl bg-brand-primary px-8 py-3 font-bold text-white hover:bg-brand-dark"
                    >

                        Add Question

                    </button>

                </form>

                <div className="mt-10 rounded-2xl bg-white shadow">

                    <table className="w-full">

                        <thead className="bg-brand-primary text-white">

                            <tr>

                                <th className="p-4 text-left">

                                    Order

                                </th>

                                <th className="p-4 text-left">

                                    Question

                                </th>

                                <th className="p-4 text-left">

                                    Category

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {selected?.map((item:any)=>(

                                <tr
                                    key={item.id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        {item.sort_order}

                                    </td>

                                    <td className="p-4">

                                        {Array.isArray(item.question_bank)
                                            ? item.question_bank[0]?.title
                                            : item.question_bank?.title}

                                    </td>

                                    <td className="p-4">

                                        {Array.isArray(item.question_bank)
                                            ? item.question_bank[0]?.category
                                            : item.question_bank?.category}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </main>

    );

}
