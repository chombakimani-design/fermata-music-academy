import { createClient } from "@/lib/supabase/server";


export default async function TutorLessonProgress({

    studentId

}:{
    studentId:string;
}){


    const supabase = await createClient();



    const {data:progress}=await supabase
        .from("lesson_progress")
        .select(`
            id,
            completed,
            progress_percent,
            completed_at,
            course_outlines(
                title,
                courses(
                    course_name
                )
            )
        `)
        .eq("student_id",studentId)
        .order("id",{ascending:true});



    return (

        <div className="mt-6 rounded-2xl border border-brand-gold bg-white p-6 shadow">


            <h2 className="text-2xl font-bold text-brand-dark">

                Lesson Progress

            </h2>



            <div className="mt-5 space-y-4">


                {progress?.map((item:any)=>(

                    <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 p-5"
                    >


                        <h3 className="font-bold text-brand-primary">

                            {item.course_outlines?.courses?.course_name}

                        </h3>



                        <p className="mt-2 font-semibold">

                            {item.course_outlines?.title}

                        </p>



                        <p className="mt-2 text-sm text-slate-600">

                            Progress:
                            {" "}
                            {item.progress_percent}%

                        </p>



                        <p className="mt-1 text-sm">

                            {item.completed
                            ? "Completed ✓"
                            : "In Progress"}

                        </p>



                    </div>

                ))}



                {(!progress || progress.length===0) && (

                    <p className="text-slate-500">

                        No learning activity recorded.

                    </p>

                )}


            </div>


        </div>

    );

}
