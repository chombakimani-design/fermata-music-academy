import { createClient } from "@/lib/supabase/server";
import Link from "next/link";


export default async function LessonNavigation({

    courseId,

    sortOrder

}:{
    courseId:number;
    sortOrder:number;
}){


    const supabase = await createClient();



    const {data:previous}=await supabase
        .from("course_outlines")
        .select("id,title")
        .eq("course_id",courseId)
        .lt("sort_order",sortOrder)
        .order("sort_order",{ascending:false})
        .limit(1)
        .single();



    const {data:next}=await supabase
        .from("course_outlines")
        .select("id,title")
        .eq("course_id",courseId)
        .gt("sort_order",sortOrder)
        .order("sort_order",{ascending:true})
        .limit(1)
        .single();



    return (

        <div className="mt-8 flex justify-between gap-4">


            {previous ? (

                <Link

                    href={`/student/lessons/${previous.id}`}

                    className="rounded-xl border border-brand-gold bg-white px-6 py-3 font-bold text-brand-dark"

                >

                    ← Previous Lesson

                </Link>

            ):(
                <div/>
            )}




            {next && (

                <Link

                    href={`/student/lessons/${next.id}`}

                    className="rounded-xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"

                >

                    Next Lesson →

                </Link>

            )}


        </div>

    );

}
