import { createClient } from "@/lib/supabase/server";


export default async function StudentActivity(){


    const supabase = await createClient();



    const {
        data:{user}
    } = await supabase.auth.getUser();



    if(!user){

        return null;

    }



    const {data:activity}=await supabase
        .from("lesson_progress")
        .select(`
            id,
            last_viewed_at,
            completed,
            progress_percent,
            course_outlines(
                title,
                courses(
                    course_name
                )
            )
        `)
        .eq("student_id",user.id)
        .order("last_viewed_at",{ascending:false})
        .limit(5);



    return (

        <div className="mt-8 rounded-2xl border border-brand-gold bg-white p-8 shadow">


            <h2 className="text-2xl font-bold text-brand-dark">

                Recent Learning Activity

            </h2>



            <div className="mt-5 space-y-4">


                {activity?.map((item:any)=>(

                    <div

                        key={item.id}

                        className="rounded-xl border border-slate-200 p-5"

                    >


                        <h3 className="font-bold text-brand-primary">

                            {item.course_outlines?.courses?.course_name}

                        </h3>



                        <p className="mt-2">

                            {item.course_outlines?.title}

                        </p>



                        <p className="mt-2 text-sm text-slate-600">

                            Progress:
                            {" "}
                            {item.progress_percent}%

                        </p>



                        <p className="mt-1 text-xs text-slate-500">

                            Last viewed:
                            {" "}
                            {item.last_viewed_at
                            ? new Date(item.last_viewed_at).toLocaleDateString()
                            : "Not started"}

                        </p>


                    </div>


                ))}



                {(!activity || activity.length===0) && (

                    <p className="text-slate-500">

                        No learning activity yet.

                    </p>

                )}


            </div>


        </div>

    );

}
