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


        <main className="min-h-screen bg-brand-light p-4 md:p-6">


            <div className="mx-auto max-w-7xl">



                <div className="rounded-2xl border border-brand-gold bg-white p-5 shadow md:p-8">



                    <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">

                        Practice Centre

                    </h1>



                    <p className="mt-3 text-sm text-slate-600 md:text-base">

                        Practice questions by topic without affecting your official quiz records.

                    </p>



                </div>





                <div className="mt-8 space-y-6">



                    {Object.entries(grouped).map(([category,items])=>(


                        <div

                            key={category}

                            className="rounded-2xl border border-brand-gold bg-white p-5 shadow md:p-6"

                        >



                            <h2 className="text-xl font-bold text-brand-primary md:text-2xl">

                                {category}

                            </h2>





                            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">



                                {items.map((question:any)=>(



                                    <Link

                                        key={question.id}

                                        href={`/student/practice/${question.id}`}

                                        className="rounded-xl border border-slate-200 p-4 transition hover:border-brand-primary hover:shadow md:p-5"

                                    >



                                        <h3 className="font-semibold text-brand-dark">

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
