import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function QuizResultsPage({

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

        redirect("/auth/login");

    }



    const {data:attempt,error:attemptError}=await supabase
        .from("lesson_quiz_attempts")
        .select(`
            id,
            score,
            percentage,
            passed,
            submitted_at
        `)
        .eq("quiz_id",quizId)
        .eq("student_id",user.id)
        .order("submitted_at",{ascending:false})
        .limit(1)
        .single();



    if(attemptError || !attempt){

        redirect(`/student/quizzes/${quizId}`);

    }




    const {data:answers,error:answerError}=await supabase
        .from("lesson_quiz_answers")
        .select(`
            selected_answer,
            is_correct,
            marks_awarded,
            question_bank(
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_answer,
                marks
            )
        `)
        .eq("attempt_id",attempt.id);



    if(answerError){

        throw new Error(answerError.message);

    }




    return(

        <main className="min-h-screen bg-brand-light p-4 md:p-6">

            <div className="mx-auto max-w-5xl">


                <div className="rounded-2xl bg-white p-5 shadow md:p-8">


                    <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">

                        Quiz Results

                    </h1>



                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


                        <div className="rounded-xl border p-5">

                            <p className="text-sm text-slate-500">
                                Score
                            </p>

                            <p className="mt-2 text-2xl font-bold md:text-3xl">

                                {attempt.score}

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
                                Result
                            </p>

                            <p className={attempt.passed
                                ?"mt-2 text-2xl font-bold text-green-600 md:text-3xl"
                                :"mt-2 text-2xl font-bold text-red-600 md:text-3xl"}>

                                {attempt.passed ? "PASS" : "FAIL"}

                            </p>

                        </div>



                        <div className="rounded-xl border p-5">

                            <p className="text-sm text-slate-500">
                                Submitted
                            </p>

                            <p className="mt-2 text-sm font-semibold">

                                {attempt.submitted_at
                                    ? new Date(attempt.submitted_at).toLocaleString()
                                    : "-"}

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
                                key={index}
                                className="rounded-xl border border-slate-200 bg-white p-5 shadow md:p-6"
                            >


                                <h2 className="font-bold text-slate-900">

                                    {index+1}. {question?.question}

                                </h2>



                                <div className="mt-4 space-y-2 text-sm md:text-base">

                                    {question?.option_a && <p>A. {question.option_a}</p>}

                                    {question?.option_b && <p>B. {question.option_b}</p>}

                                    {question?.option_c && <p>C. {question.option_c}</p>}

                                    {question?.option_d && <p>D. {question.option_d}</p>}

                                </div>




                                <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">


                                    <p>
                                        <strong>Your Answer:</strong> {answer.selected_answer}
                                    </p>


                                    <p>
                                        <strong>Correct Answer:</strong> {question?.correct_answer}
                                    </p>


                                    <p>
                                        <strong>Marks Awarded:</strong> {answer.marks_awarded} / {question?.marks}
                                    </p>



                                    <p className={answer.is_correct
                                        ?"font-bold text-green-600"
                                        :"font-bold text-red-600"}>

                                        {answer.is_correct
                                            ?"Correct ✓"
                                            :"Incorrect ✗"}

                                    </p>


                                </div>


                            </div>


                        );


                    })}


                </div>



            </div>


        </main>

    );


}
