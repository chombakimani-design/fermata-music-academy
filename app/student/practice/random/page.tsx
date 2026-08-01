import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function RandomPracticePage(){

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

    if(!user){

        redirect("/auth/login");

    }

    const {data:questions,error}=await supabase

        .from("question_bank")

        .select(`
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            marks
        `);

    if(error){

        throw new Error(error.message);

    }

    const shuffled=(questions ?? [])

        .sort(()=>Math.random()-0.5)

        .slice(0,10);

    async function markPractice(formData:FormData){

        "use server";

        let score=0;

        const results:any[]=[];

        for(const question of shuffled){

            const answer=String(

                formData.get(`question_${question.id}`) ?? ""

            );

            const correct=answer===question.correct_answer;

            if(correct){

                score+=question.marks;

            }

            results.push({

                id:question.id,

                selected:answer,

                correct:question.correct_answer,

                isCorrect:correct

            });

        }

        const encoded=encodeURIComponent(

            JSON.stringify({

                score,

                total:shuffled.reduce(

                    (sum,q)=>sum+q.marks,

                    0

                ),

                results

            })

        );

        redirect(

            `/student/practice/random/results?data=${encoded}`

        );

    }

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow">

                <h1 className="text-4xl font-bold text-brand-dark">

                    Random Practice Test

                </h1>

                <p className="mt-3 text-slate-600">

                    Ten randomly selected questions from the Question Bank.

                </p>

                <form
                    action={markPractice}
                    className="mt-8 space-y-8"
                >

                    {shuffled.map((question,index)=>(

                        <div
                            key={question.id}
                            className="rounded-xl border border-slate-200 p-6"
                        >

                            <h2 className="font-bold">

                                {index+1}. {question.question}

                            </h2>

                            <div className="mt-4 space-y-3">

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
                                        className="flex gap-3 rounded-lg border p-3"
                                    >

                                        <input
                                            type="radio"
                                            name={`question_${question.id}`}
                                            value={key}
                                            required
                                        />

                                        <span>

                                            <strong>{key}.</strong> {value}

                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>

                    ))}

                    <button
                        type="submit"
                        className="rounded-xl bg-brand-primary px-8 py-3 font-bold text-white hover:bg-brand-dark"
                    >

                        Finish Practice Test

                    </button>

                </form>

            </div>

        </main>

    );

}
