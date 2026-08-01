import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PracticeQuestionPage({

    params

}:{
    params:Promise<{id:string}>
}){

    const {id}=await params;

    const questionId=Number(id);

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

    if(!user){

        redirect("/auth/login");

    }

    const {data:question,error}=await supabase

        .from("question_bank")

        .select("*")

        .eq("id",questionId)

        .single();

    if(error || !question){

        redirect("/student/practice");

    }

    async function checkAnswer(formData:FormData){

        "use server";

        const answer=String(formData.get("answer"));

        redirect(

            `/student/practice/${questionId}/result?selected=${answer}`

        );

    }

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

                <h1 className="text-3xl font-bold text-brand-dark">

                    Practice Question

                </h1>

                <p className="mt-6 text-xl font-semibold">

                    {question.question}

                </p>

                <form
                    action={checkAnswer}
                    className="mt-8 space-y-4"
                >

                    {[
                        ["A",question.option_a],
                        ["B",question.option_b],
                        ["C",question.option_c],
                        ["D",question.option_d]
                    ]
                    .filter(([,value])=>value)
                    .map(([key,value])=>(

                        <label
                            key={key}
                            className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:bg-slate-50"
                        >

                            <input
                                type="radio"
                                name="answer"
                                value={key}
                                required
                            />

                            <span>

                                <strong>{key}.</strong> {value}

                            </span>

                        </label>

                    ))}

                    <button
                        type="submit"
                        className="mt-6 rounded-xl bg-brand-primary px-8 py-3 font-bold text-white hover:bg-brand-dark"
                    >

                        Check Answer

                    </button>

                </form>

            </div>

        </main>

    );

}
