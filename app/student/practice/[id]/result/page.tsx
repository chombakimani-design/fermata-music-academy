import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PracticeResultPage({

    params,

    searchParams

}:{
    params:Promise<{id:string}>;

    searchParams:Promise<{selected?:string}>;
}){

    const {id}=await params;

    const {selected}=await searchParams;

    const supabase=await createClient();

    const {data:question}=await supabase

        .from("question_bank")

        .select("*")

        .eq("id",Number(id))

        .single();

    if(!question){

        redirect("/student/practice");

    }

    const correct=selected===question.correct_answer;

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

                <h1 className="text-3xl font-bold text-brand-dark">

                    Practice Result

                </h1>

                <div className="mt-8 rounded-xl border p-6">

                    <p>

                        <strong>Your Answer:</strong> {selected}

                    </p>

                    <p className="mt-3">

                        <strong>Correct Answer:</strong> {question.correct_answer}

                    </p>

                    <p className={correct ? "mt-5 text-2xl font-bold text-green-600" : "mt-5 text-2xl font-bold text-red-600"}>

                        {correct ? "Correct ✓" : "Incorrect ✗"}

                    </p>

                </div>

                <div className="mt-8 flex gap-4">

                    <Link
                        href={`/student/practice/${question.id}`}
                        className="rounded-xl border border-brand-primary px-6 py-3 font-bold text-brand-primary"
                    >

                        Try Again

                    </Link>

                    <Link
                        href="/student/practice"
                        className="rounded-xl bg-brand-primary px-6 py-3 font-bold text-white"
                    >

                        Back to Practice

                    </Link>

                </div>

            </div>

        </main>

    );

}
