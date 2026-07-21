import { createClient } from "@/lib/supabase/server";

export default async function Home() {

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("courses")
        .select("*");

    console.log(data);
    console.log(error);

    return (

        <main className="flex min-h-screen items-center justify-center">

            <div className="rounded-2xl border border-brand-gold bg-white p-10 shadow">

                <h1 className="text-4xl font-bold text-brand-dark">

                    Fermata Music Academy

                </h1>

                <p className="mt-4 text-slate-600">

                    Supabase Connected Successfully

                </p>

            </div>

        </main>

    );

}
