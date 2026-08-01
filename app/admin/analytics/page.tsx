import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LearningAnalyticsPage(){

    const supabase=await createClient();

    const {

        data:{user}

    }=await supabase.auth.getUser();

    if(!user){

        redirect("/admin/login");

    }

    const {data:profile}=await supabase

        .from("profiles")

        .select("role")

        .eq("id",user.id)

        .single();

    if(

        profile?.role!=="admin" &&

        profile?.role!=="super_admin"

    ){

        redirect("/");

    }



    const [

        studentsResult,

        coursesResult,

        quizzesResult,

        quizAttemptsResult,

        practiceAttemptsResult,

        lessonProgressResult

    ]=await Promise.all([

        supabase

            .from("profiles")

            .select("id")

            .eq("role","student"),

        supabase

            .from("courses")

            .select("id"),

        supabase

            .from("lesson_quizzes")

            .select("id"),

        supabase

            .from("lesson_quiz_attempts")

            .select("percentage"),

        supabase

            .from("practice_attempts")

            .select("percentage"),

        supabase

            .from("lesson_progress")

            .select("completed")

    ]);



    const studentCount=

        studentsResult.data?.length ?? 0;

    const courseCount=

        coursesResult.data?.length ?? 0;

    const quizCount=

        quizzesResult.data?.length ?? 0;

    const quizAttempts=

        quizAttemptsResult.data ?? [];

    const practiceAttempts=

        practiceAttemptsResult.data ?? [];

    const progress=

        lessonProgressResult.data ?? [];



    const averageQuiz=

        quizAttempts.length===0

        ?0

        :(

            quizAttempts.reduce(

                (sum,item)=>

                    sum+Number(item.percentage),

                0

            )/

            quizAttempts.length

        ).toFixed(1);



    const averagePractice=

        practiceAttempts.length===0

        ?0

        :(

            practiceAttempts.reduce(

                (sum,item)=>

                    sum+Number(item.percentage),

                0

            )/

            practiceAttempts.length

        ).toFixed(1);



    const completedLessons=

        progress.filter(

            item=>item.completed

        ).length;



    const completionRate=

        progress.length===0

        ?0

        :Math.round(

            completedLessons/

            progress.length*

            100

        );



    return(

        <main className="min-h-screen bg-brand-light p-6">

            <div className="mx-auto max-w-7xl">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-brand-dark">

                            Learning Analytics

                        </h1>

                        <p className="mt-2 text-slate-600">

                            Institution-wide learning statistics.

                        </p>

                    </div>

                </div>



                <div className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-6">



                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-sm text-slate-500">

                            Students

                        </p>

                        <h2 className="mt-2 text-3xl font-bold">

                            {studentCount}

                        </h2>

                    </div>



                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-sm text-slate-500">

                            Courses

                        </p>

                        <h2 className="mt-2 text-3xl font-bold">

                            {courseCount}

                        </h2>

                    </div>



                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-sm text-slate-500">

                            Quizzes

                        </p>

                        <h2 className="mt-2 text-3xl font-bold">

                            {quizCount}

                        </h2>

                    </div>



                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-sm text-slate-500">

                            Avg Quiz

                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-blue-600">

                            {averageQuiz}%

                        </h2>

                    </div>



                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-sm text-slate-500">

                            Avg Practice

                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-600">

                            {averagePractice}%

                        </h2>

                    </div>



                    <div className="rounded-2xl bg-white p-6 shadow">

                        <p className="text-sm text-slate-500">

                            Completion

                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-brand-primary">

                            {completionRate}%

                        </h2>

                    </div>



                </div>



                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">



                    <Link
                        href="/admin/practice"
                        className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
                    >

                        <h2 className="text-2xl font-bold">

                            Practice Analytics

                        </h2>

                        <p className="mt-3 text-slate-600">

                            Review all practice assessments.

                        </p>

                    </Link>



                    <Link
                        href="/admin/quizzes"
                        className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
                    >

                        <h2 className="text-2xl font-bold">

                            Quiz Management

                        </h2>

                        <p className="mt-3 text-slate-600">

                            Manage quizzes and assessments.

                        </p>

                    </Link>



                    <Link
                        href="/admin/question-bank"
                        className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
                    >

                        <h2 className="text-2xl font-bold">

                            Question Bank

                        </h2>

                        <p className="mt-3 text-slate-600">

                            Manage reusable assessment questions.

                        </p>

                    </Link>



                </div>

            </div>

        </main>

    );

}
