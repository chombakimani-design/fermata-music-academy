import { createClient } from "@/lib/supabase/server";


export default async function TutorCourseProgress({

    studentId

}:{
    studentId:string;
}){


    const supabase = await createClient();



    const {data:courses}=await supabase
        .from("student_courses")
        .select(`
            course_id,
            courses(
                course_name
            )
        `)
        .eq("student_id",studentId);



    return (

        <div className="mt-6 rounded-2xl border border-brand-gold bg-white p-6 shadow">


            <h2 className="text-2xl font-bold text-brand-dark">

                Course Completion

            </h2>



            <div className="mt-5 space-y-5">


                {courses?.map(async(course:any)=>{


                    const {data:lessons}=await supabase
                        .from("course_outlines")
                        .select("id")
                        .eq("course_id",course.course_id);



                    const lessonIds = lessons?.map(
                        lesson=>lesson.id
                    ) || [];



                    const {data:completed}=await supabase
                        .from("lesson_progress")
                        .select("id")
                        .eq("student_id",studentId)
                        .eq("completed",true)
                        .in("course_outline_id",lessonIds);



                    const total = lessonIds.length;

                    const done = completed?.length || 0;



                    const percentage = total===0
                    ? 0
                    : Math.round((done / total) * 100);



                    return (

                        <div
                            key={course.course_id}
                            className="rounded-xl border border-slate-200 p-5"
                        >


                            <h3 className="font-bold text-brand-primary">

                                {course.courses?.course_name}

                            </h3>



                            <div className="mt-3 h-3 rounded-full bg-slate-200">


                                <div

                                    className="h-3 rounded-full bg-brand-primary"

                                    style={{
                                        width:`${percentage}%`
                                    }}

                                />


                            </div>



                            <p className="mt-2 text-sm font-semibold">

                                {done}/{total} lessons completed
                                {" "}
                                ({percentage}%)

                            </p>



                        </div>

                    );


                })}



                {(!courses || courses.length===0) && (

                    <p className="text-slate-500">

                        No enrolled courses.

                    </p>

                )}



            </div>


        </div>

    );

}
