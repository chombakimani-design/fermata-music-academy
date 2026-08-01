import Link from "next/link";

export default async function RandomPracticeResults({

    searchParams

}:{
    searchParams:Promise<{data?:string}>
}){

    const {data}=await searchParams;

    if(!data){

        return null;

    }

    const result=JSON.parse(

        decodeURIComponent(data)

    );

    const percentage=Math.round(

        result.score/result.total*100

    );

    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">

                <h1 className="text-4xl font-bold text-brand-dark">

                    Practice Test Results

                </h1>

                <div className="mt-8 grid gap-6 md:grid-cols-3">

                    <div className="rounded-xl border p-6">

                        <p>Score</p>

                        <p className="mt-2 text-3xl font-bold">

                            {result.score}/{result.total}

                        </p>

                    </div>

                    <div className="rounded-xl border p-6">

                        <p>Percentage</p>

                        <p className="mt-2 text-3xl font-bold">

                            {percentage}%

                        </p>

                    </div>

                    <div className="rounded-xl border p-6">

                        <p>Grade</p>

                        <p className="mt-2 text-3xl font-bold">

                            {percentage>=80?"Excellent":
                             percentage>=60?"Good":
                             percentage>=40?"Fair":"Needs Practice"}

                        </p>

                    </div>

                </div>

                <Link
                    href="/student/practice/random"
                    className="mt-8 inline-block rounded-xl bg-brand-primary px-8 py-3 font-bold text-white"
                >

                    Try Another Random Test

                </Link>

            </div>

        </main>

    );

}
