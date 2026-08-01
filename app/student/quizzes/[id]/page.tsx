import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { submitQuiz } from "@/app/student/quizzes/actions/submitQuiz";


export default async function QuizPage({

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





    const {data:quiz,error:quizError}=await supabase

        .from("lesson_quizzes")

        .select(`
            id,
            title,
            instructions,
            pass_mark,
            time_limit_minutes
        `)

        .eq("id",quizId)

        .single();





    if(quizError || !quiz){

        redirect("/student/my-courses");

    }






    const {data:links,error:questionError}=await supabase

        .from("quiz_question_bank")

        .select(`
            sort_order,
            question_bank(
                id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                marks
            )
        `)

        .eq("quiz_id",quizId)

        .order("sort_order");





    if(questionError){

        throw new Error(questionError.message);

    }





    const questions=(links ?? [])

        .map((row:any)=>

            Array.isArray(row.question_bank)

                ? row.question_bank[0]

                : row.question_bank

        )

        .filter(Boolean);






    return(


        <main className="min-h-screen bg-brand-light p-4 md:p-6">


            <div className="mx-auto max-w-4xl rounded-2xl border border-brand-gold bg-white p-5 shadow md:p-8">



                <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">

                    {quiz.title}

                </h1>




                {quiz.instructions && (

                    <p className="mt-3 text-slate-600">

                        {quiz.instructions}

                    </p>

                )}






                <div className="mt-6 grid gap-3 rounded-xl bg-brand-light p-4 text-sm md:grid-cols-3">


                    <span>

                        <strong>Pass Mark:</strong>{" "}

                        {quiz.pass_mark}%

                    </span>


                    {quiz.time_limit_minutes && (

                        <span>

                            <strong>Time:</strong>{" "}

                            {quiz.time_limit_minutes} minutes

                        </span>

                    )}


                    <span>

                        <strong>Questions:</strong>{" "}

                        {questions.length}

                    </span>


                </div>






                {questions.length === 0 ? (


                    <div className="mt-8 rounded-xl border p-8 text-center text-slate-500">

                        No questions available for this quiz.

                    </div>


                ) : (



                    <form

                        action={submitQuiz}

                        className="mt-8 space-y-6"

                    >



                        <input

                            type="hidden"

                            name="quiz_id"

                            value={quiz.id}

                        />



                        <input

                            type="hidden"

                            name="student_id"

                            value={user.id}

                        />






                        {questions.map((question:any,index:number)=>(


                            <div

                                key={question.id}

                                className="rounded-xl border border-slate-200 p-5 md:p-6"

                            >



                                <h2 className="font-bold text-slate-900 md:text-lg">

                                    {index+1}. {question.question}

                                </h2>



                                <p className="mt-2 text-sm text-slate-500">

                                    Marks: {question.marks}

                                </p>





                                <div className="mt-5 space-y-3">


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

                                            className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-slate-50"

                                        >


                                            <input

                                                type="radio"

                                                name={`question_${question.id}`}

                                                value={key}

                                                required

                                                className="mt-1"

                                            />



                                            <span className="text-sm md:text-base">

                                                <strong>{key}.</strong>{" "}

                                                {value}

                                            </span>



                                        </label>


                                    ))}


                                </div>



                            </div>


                        ))}






                        <button

                            type="submit"

                            className="w-full rounded-xl bg-brand-primary px-8 py-3 font-bold text-white hover:bg-brand-dark"

                        >

                            Submit Quiz

                        </button>




                    </form>



                )}





            </div>



        </main>


    );

}
