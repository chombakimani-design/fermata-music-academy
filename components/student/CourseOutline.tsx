import Link from "next/link";
import { createClient } from "@/lib/supabase/server";


export default async function CourseOutline({
    courseId
}:{
    courseId:number;
}){


    const supabase = await createClient();


    const {data:lessons}=await supabase
        .from("course_outlines")
        .select(`
            id,
            title,
            description,
            sort_order
        `)
        .eq("course_id",courseId)
        .order("sort_order",{ascending:true});



    return (

        <div className="mt-6 rounded-2xl border border-brand-gold bg-white p-6 shadow">


            <h2 className="text-2xl font-bold text-brand-dark">
                Course Outline
            </h2>



            <div className="mt-5 space-y-4">


                {lessons?.map((lesson:any)=>(

                    <Link
                        key={lesson.id}
                        href={`/student/lessons/${lesson.id}`}
                        className="block rounded-xl border border-slate-200 p-5 hover:bg-brand-light"
                    >

                        <h3 className="font-bold text-brand-primary">

                            {lesson.sort_order}.
                            {" "}
                            {lesson.title}

                        </h3>


                        <p className="mt-2 text-slate-600">

                            {lesson.description}

                        </p>


                        <p className="mt-3 text-sm font-semibold text-brand-dark">

                            Open Lesson →

                        </p>


                    </Link>


                ))}



                {(!lessons || lessons.length===0) && (

                    <p className="text-slate-500">
                        No lessons available yet.
                    </p>

                )}


            </div>


        </div>

    );

}
