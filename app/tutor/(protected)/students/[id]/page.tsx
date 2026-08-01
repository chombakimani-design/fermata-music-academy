import TutorStudentStats from "@/components/tutor/TutorStudentStats";
import TutorCourseProgress from "@/components/tutor/TutorCourseProgress";
import TutorLessonProgress from "@/components/tutor/TutorLessonProgress";
import TutorAssessmentSummary from "@/components/tutor/TutorAssessmentSummary";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function TutorStudentPage({

    params

}:{
    params:Promise<{id:string}>
}){


    const {id}=await params;


    const supabase = await createClient();



    const {
        data:{user}
    } = await supabase.auth.getUser();



    if(!user){

        redirect("/tutor/login");

    }



    const {data:student}=await supabase
        .from("profiles")
        .select(`
            first_name,
            last_name,
            student_id
        `)
        .eq("id",id)
        .single();



    const {data:courses}=await supabase
        .from("student_courses")
        .select(`
            courses(
                course_name,
                level
            )
        `)
        .eq("student_id",id);



    return (

        <main className="min-h-screen bg-brand-light p-6">


            <div className="mx-auto max-w-6xl">


                <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">


                    <h1 className="text-4xl font-bold text-brand-dark">

                        {student?.first_name}
                        {" "}
                        {student?.last_name}

                    </h1>



                    <p className="mt-3 text-slate-600">

                        Student ID:
                        {" "}
                        {student?.student_id}

                    </p>


                </div>




                <TutorStudentStats

                    studentId={id}

                />




                <div className="mt-8 rounded-2xl border border-brand-gold bg-white p-8 shadow">


                    <h2 className="text-2xl font-bold text-brand-dark">

                        Enrolled Courses

                    </h2>



                    <div className="mt-5 space-y-4">


                        {courses?.map((item:any)=>(

                            <div

                                key={item.courses.course_name}

                                className="rounded-xl border border-slate-200 p-5"

                            >

                                <h3 className="font-bold text-brand-primary">

                                    {item.courses.course_name}

                                </h3>



                                <p className="text-sm text-slate-500">

                                    Level:
                                    {" "}
                                    {item.courses.level}

                                </p>


                            </div>

                        ))}


                    </div>


                </div>




                <TutorCourseProgress

                    studentId={id}

                />



                <TutorLessonProgress

                    studentId={id}

                />



                <TutorAssessmentSummary

                    studentId={id}

                />


            </div>


        </main>

    );

}
