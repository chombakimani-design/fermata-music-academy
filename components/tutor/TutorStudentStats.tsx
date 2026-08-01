import { getStudentLearningStats } from "@/lib/student/stats";


export default async function TutorStudentStats({

    studentId

}:{
    studentId:string;
}){


    const stats = await getStudentLearningStats(
        studentId
    );



    return (

        <div className="mt-6 grid gap-5 md:grid-cols-4">


            <div className="rounded-2xl border border-brand-gold bg-white p-6 shadow">

                <p className="text-sm text-slate-500">

                    Courses

                </p>


                <p className="mt-2 text-3xl font-bold text-brand-dark">

                    {stats.courses}

                </p>


            </div>




            <div className="rounded-2xl border border-brand-gold bg-white p-6 shadow">

                <p className="text-sm text-slate-500">

                    Total Lessons

                </p>


                <p className="mt-2 text-3xl font-bold text-brand-dark">

                    {stats.lessons}

                </p>


            </div>




            <div className="rounded-2xl border border-brand-gold bg-white p-6 shadow">

                <p className="text-sm text-slate-500">

                    Completed

                </p>


                <p className="mt-2 text-3xl font-bold text-brand-primary">

                    {stats.completed}

                </p>


            </div>




            <div className="rounded-2xl border border-brand-gold bg-white p-6 shadow">

                <p className="text-sm text-slate-500">

                    Completion

                </p>


                <p className="mt-2 text-3xl font-bold text-brand-dark">

                    {stats.percentage}%

                </p>


            </div>


        </div>

    );

}
