import { createClient } from "@/lib/supabase/server";


export default async function StudentAssessments(){


    const supabase = await createClient();



    const {
        data:{user}
    } = await supabase.auth.getUser();



    if(!user){

        return null;

    }



    const {data:assessments}=await supabase
        .from("assessments")
        .select(`
            id,
            title,
            score,
            grade,
            created_at,
            courses(
                course_name
            )
        `)
        .eq("student_id",user.id)
        .order("created_at",{ascending:false});



    return (

        <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow">


            <h2 className="text-2xl font-bold text-brand-dark">

                My Assessments

            </h2>



            <div className="mt-5 space-y-4">


                {assessments?.map((item:any)=>(

                    <div

                        key={item.id}

                        className="rounded-xl border border-slate-200 p-5"

                    >


                        <h3 className="font-bold text-brand-primary">

                            {item.courses?.course_name}

                        </h3>



                        <p className="mt-2 font-semibold">

                            {item.title}

                        </p>



                        <p className="mt-2 text-sm text-slate-600">

                            Score:
                            {" "}
                            {item.score ?? "Pending"}

                        </p>



                        <p className="mt-1 text-sm text-slate-600">

                            Grade:
                            {" "}
                            {item.grade ?? "-"}

                        </p>



                    </div>


                ))}



                {(!assessments || assessments.length===0) && (

                    <p className="text-slate-500">

                        No assessments available yet.

                    </p>

                )}


            </div>


        </div>

    );

}
