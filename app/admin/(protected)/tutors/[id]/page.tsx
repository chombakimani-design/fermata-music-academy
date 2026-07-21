import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";


export default async function TutorDetailPage({
    params
}: {
    params: Promise<{
        id:string;
    }>
}) {


    const { id } = await params;


    const supabase = await createClient();



    const { data:tutor } = await supabase
        .from("profiles")
        .select(`
            id,
            first_name,
            last_name,
            auth_email,
            role
        `)
        .eq("id", id)
        .single();



    if(!tutor){

        notFound();

    }



    const { data:courses } = await supabase
        .from("tutor_courses")
        .select(`
            id,
            courses(
                course_name,
                level,
                duration
            )
        `)
        .eq(
            "tutor_id",
            id
        );



    const { data:students } = await supabase
        .from("tutor_students")
        .select(`
            id,
            profiles!tutor_students_student_id_fkey(
                student_id,
                first_name,
                last_name,
                auth_email
            )
        `)
        .eq(
            "tutor_id",
            id
        );



    return (

        <main>


            <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow">


                <h1 className="text-4xl font-bold text-brand-dark">

                    Tutor Profile

                </h1>


                <div className="mt-5 space-y-2 text-slate-700">


                    <p className="text-2xl font-bold text-brand-primary">

                        {tutor.first_name} {tutor.last_name}

                    </p>


                    <p>
                        Email: {tutor.auth_email}
                    </p>


                    <p>
                        Role: {tutor.role}
                    </p>


                </div>


            </div>




            <div className="mt-8 rounded-xl border border-brand-gold bg-white p-8 shadow">


                <h2 className="text-2xl font-bold text-brand-dark">

                    Assigned Courses

                </h2>



                <div className="mt-5 space-y-4">


                    {courses?.map((item:any)=>(


                        <div
                            key={item.id}
                            className="rounded-lg border p-5"
                        >

                            <p className="font-bold text-brand-primary">

                                {item.courses?.[0]?.course_name}

                            </p>


                            <p>
                                Level: {item.courses?.[0]?.level}
                            </p>


                            <p>
                                Duration: {item.courses?.[0]?.duration}
                            </p>


                        </div>


                    ))}



                    {courses?.length === 0 && (

                        <p className="text-slate-600">

                            No courses assigned.

                        </p>

                    )}


                </div>


            </div>





            <div className="mt-8 rounded-xl border border-brand-gold bg-white p-8 shadow">


                <h2 className="text-2xl font-bold text-brand-dark">

                    Assigned Students

                </h2>



                <div className="mt-5 space-y-4">


                    {students?.map((item:any)=>(


                        <div
                            key={item.id}
                            className="rounded-lg border p-5"
                        >

                            <p className="font-bold text-brand-primary">

                                {item.profiles?.[0]?.first_name} {item.profiles?.[0]?.last_name}

                            </p>


                            <p>
                                Student ID: {item.profiles?.[0]?.student_id}
                            </p>


                            <p>
                                {item.profiles?.[0]?.auth_email}
                            </p>


                        </div>


                    ))}



                    {students?.length === 0 && (

                        <p className="text-slate-600">

                            No students assigned.

                        </p>

                    )}


                </div>


            </div>



        </main>

    );


}

