import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PracticePage(){

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
            title,
            category,
            difficulty
        `)

        .order("category")
        .order("title");

    if(error){

        throw new Error(error.message);

    }

    const grouped:Record<string,any[]>= {};

    for(const question of questions ?? []){

        const category=question.category || "General";

        if(!grouped[category]){

            grouped[category]=[];

        }

        grouped[category].push(question);

    }

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-7xl">

                <h1 className="text-4xl font-bold text-brand-dark">

                    Practice Centre

                </h1>

                <p className="mt-3 text-slate-600">

                    Practice questions by topic without affecting your official quiz records.

                </p>

                <div className="mt-8 space-y-8">

                    {Object.entries(grouped).map(([category,items])=>(

                        <div
                            key={category}
                            className="rounded-2xl bg-white p-6 shadow"
                        >

                            <h2 className="text-2xl font-bold text-brand-primary">

                                {category}

                            </h2>

                            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                                {items.map((question:any)=>(

                                    <Link
                                        key={question.id}
                                        href={`/student/practice/${question.id}`}
                                        className="rounded-xl border border-slate-200 p-5 transition hover:border-brand-primary hover:shadow"
                                    >

                                        <h3 className="font-semibold">

                                            {question.title}

                                        </h3>

                                        <p className="mt-2 text-sm text-slate-500">

                                            Difficulty: {question.difficulty}

                                        </p>

                                    </Link>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </main>

    );

}
