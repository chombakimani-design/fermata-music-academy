import { createClient } from "@/lib/supabase/server";


export default async function CourseResources({

    courseId

}:{
    courseId:number;
}){


    const supabase = await createClient();



    const {data:resources}=await supabase
        .from("course_resources")
        .select(`
            id,
            title,
            description,
            resource_url
        `)
        .eq("course_id",courseId)
        .order("id",{ascending:true});



    return (

        <div className="mt-6 rounded-2xl border border-brand-gold bg-white p-6 shadow">


            <h2 className="text-2xl font-bold text-brand-dark">

                Learning Resources

            </h2>



            <div className="mt-5 space-y-4">


                {resources?.map((resource:any)=>(

                    <div

                        key={resource.id}

                        className="rounded-xl border border-slate-200 p-5"

                    >


                        <h3 className="font-bold text-brand-primary">

                            {resource.title}

                        </h3>



                        <p className="mt-2 text-slate-600">

                            {resource.description}

                        </p>



                        {resource.resource_url && (

                            <a

                                href={resource.resource_url}

                                target="_blank"

                                className="mt-3 inline-block font-semibold text-brand-dark underline"

                            >

                                Open Resource →

                            </a>

                        )}


                    </div>


                ))}



                {(!resources || resources.length===0) && (

                    <p className="text-slate-500">

                        No resources available yet.

                    </p>

                )}


            </div>


        </div>

    );

}
