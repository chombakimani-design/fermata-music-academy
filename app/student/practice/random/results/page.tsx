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

        <main className="min-h-screen bg-brand-light p-4 md:p-6">


            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-5 shadow md:p-8">


                <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">

                    Practice Test Results

                </h1>



                <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3">



                    <div className="rounded-xl border p-5">

                        <p className="text-sm text-slate-500">

                            Score

                        </p>


                        <p className="mt-2 text-2xl font-bold md:text-3xl">

                            {result.score}/{result.total}

                        </p>


                    </div>




                    <div className="rounded-xl border p-5">


                        <p className="text-sm text-slate-500">

                            Percentage

                        </p>


                        <p className="mt-2 text-2xl font-bold md:text-3xl">

                            {percentage}%

                        </p>


                    </div>




                    <div className="rounded-xl border p-5">


                        <p className="text-sm text-slate-500">

                            Grade

                        </p>


                        <p className="mt-2 text-xl font-bold md:text-3xl">

                            {percentage>=80
                                ?"Excellent"
                                :percentage>=60
                                ?"Good"
                                :percentage>=40
                                ?"Fair"
                                :"Needs Practice"}

                        </p>


                    </div>



                </div>




                <Link

                    href="/student/practice/random"

                    className="mt-8 block rounded-xl bg-brand-primary px-6 py-3 text-center font-bold text-white hover:bg-brand-dark md:inline-block md:px-8"

                >

                    Try Another Random Test

                </Link>



            </div>


        </main>

    );


}
