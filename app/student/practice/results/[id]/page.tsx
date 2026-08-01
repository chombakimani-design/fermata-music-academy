import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PracticeResultsPage({

    params

}:{
    params:Promise<{id:string}>
}){

    const {id}=await params;

    const attemptId=Number(id);

    const supabase=await createClient();

    const {
        data:{user}
    }=await supabase.auth.getUser();


    if(!user){

        redirect("/auth/login");

    }


    const {data:attempt,error:attemptError}=await supabase
        .from("practice_attempts")
        .select("*")
        .eq("id",attemptId)
        .eq("student_id",user.id)
        .single();


    if(attemptError || !attempt){

        redirect("/student/practice");

    }



    const {data:answers,error:answersError}=await supabase
        .from("practice_attempt_answers")
        .select(`
            id,
            selected_answer,
            correct_answer,
            is_correct,
            marks_awarded,
            question_bank(
                id,
                title,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                marks,
                category,
                difficulty
            )
        `)
        .eq("practice_attempt_id",attemptId);



    if(answersError){

        throw new Error(answersError.message);

    }



    return(

        <main className="min-h-screen bg-brand-light p-4 md:p-6">

            <div className="mx-auto max-w-5xl">


                <div className="rounded-2xl bg-white p-5 shadow md:p-8">


                    <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">

                        Practice Results

                    </h1>



                    <div className="mt-8 grid gap-4 md:grid-cols-3">


                        <div className="rounded-xl border p-5">

                            <p className="text-sm text-slate-500">
                                Score
                            </p>

                            <p className="mt-2 text-2xl font-bold md:text-3xl">

                                {attempt.score} / {attempt.total_marks}

                            </p>

                        </div>



                        <div className="rounded-xl border p-5">

                            <p className="text-sm text-slate-500">
                                Percentage
                            </p>

                            <p className="mt-2 text-2xl font-bold md:text-3xl">

                                {attempt.percentage}%

                            </p>

                        </div>



                        <div className="rounded-xl border p-5">

                            <p className="text-sm text-slate-500">
                                Performance
                            </p>

                            <p className="mt-2 text-xl font-bold md:text-3xl">

                                {attempt.percentage>=80
                                    ?"Excellent"
                                    :attempt.percentage>=60
                                    ?"Good"
                                    :attempt.percentage>=40
                                    ?"Fair"
                                    :"Needs Practice"}

                            </p>

                        </div>


                    </div>


                </div>




                <div className="mt-8 space-y-5">


                    {answers?.map((answer:any,index:number)=>{


                        const question=Array.isArray(answer.question_bank)

                            ? answer.question_bank[0]

                            : answer.question_bank;



                        return(


                            <div
                                key={answer.id}
                                className="rounded-2xl bg-white p-5 shadow md:p-6"
                            >


                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">


                                    <h2 className="font-bold text-slate-900">

                                        {index+1}. {question?.question}

                                    </h2>



                                    <span className={
                                        answer.is_correct
                                        ?"rounded-full bg-green-100 px-3 py-1 text-center text-sm font-semibold text-green-700"
                                        :"rounded-full bg-red-100 px-3 py-1 text-center text-sm font-semibold text-red-700"
                                    }>

                                        {answer.is_correct
                                            ?"Correct"
                                            :"Incorrect"}

                                    </span>


                                </div>




                                <div className="mt-5 space-y-2 text-sm md:text-base">

                                    {question?.option_a && <p>A. {question.option_a}</p>}

                                    {question?.option_b && <p>B. {question.option_b}</p>}

                                    {question?.option_c && <p>C. {question.option_c}</p>}

                                    {question?.option_d && <p>D. {question.option_d}</p>}

                                </div>




                                <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">

                                    <p>
                                        <strong>Your Answer:</strong> {answer.selected_answer}
                                    </p>


                                    <p>
                                        <strong>Correct Answer:</strong> {answer.correct_answer}
                                    </p>


                                    <p>
                                        <strong>Marks:</strong> {answer.marks_awarded} / {question?.marks}
                                    </p>


                                    <p>
                                        <strong>Category:</strong> {question?.category}
                                    </p>


                                    <p>
                                        <strong>Difficulty:</strong> {question?.difficulty}
                                    </p>


                                </div>


                            </div>


                        );


                    })}


                </div>




                <div className="mt-10 flex flex-col gap-3 sm:flex-row">


                    <Link
                        href="/student/practice/random"
                        className="rounded-xl bg-brand-primary px-8 py-3 text-center font-bold text-white hover:bg-brand-dark"
                    >

                        New Random Test

                    </Link>



                    <Link
                        href="/student/practice"
                        className="rounded-xl border border-brand-primary px-8 py-3 text-center font-bold text-brand-primary"
                    >

                        Practice Centre

                    </Link>


                </div>



            </div>


        </main>

    );


}
