import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { checkCourseCompletion } from "@/lib/student/completion";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CertificatePDF from "@/components/student/certificate/CertificatePDF";


export default async function CertificatePage({

    params

}:{
    params:Promise<{courseId:string}>
}){


    const {courseId}=await params;

    const id=Number(courseId);


    const supabase=await createClient();


    const {
        data:{user}
    }=await supabase.auth.getUser();


    if(!user){

        redirect("/auth/login");

    }


    const completed=await checkCourseCompletion(

        user.id,

        id

    );


    if(!completed){

        redirect("/student/my-courses");

    }


    const {data:course}=await supabase
        .from("courses")
        .select("course_name")
        .eq("id",id)
        .single();


    const {data:profile}=await supabase
        .from("profiles")
        .select("first_name,last_name")
        .eq("id",user.id)
        .single();


    const fullName=

        `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim();



    return (

        <main className="min-h-screen bg-brand-light p-4 md:p-8">


            <div className="mx-auto max-w-4xl rounded-2xl border-4 border-brand-gold bg-white p-6 shadow-xl md:p-12">


                <h1 className="text-center text-3xl font-bold text-brand-dark md:text-5xl">

                    Certificate of Completion

                </h1>



                <p className="mt-10 text-center text-xl">

                    This certifies that

                </p>



                <h2 className="mt-4 text-center text-3xl font-bold text-brand-primary md:text-4xl">

                    {fullName}

                </h2>



                <p className="mt-8 text-center text-lg">

                    has successfully completed

                </p>



                <h3 className="mt-3 text-center text-2xl font-bold md:text-3xl">

                    {course?.course_name}

                </h3>



                <div className="mt-12 flex justify-center">


                    <PDFDownloadLink

                        document={

                            <CertificatePDF

                                name={fullName}

                                course={course?.course_name ?? ""}

                            />

                        }

                        fileName={`${course?.course_name}-Certificate.pdf`}

                    >

                        {({loading})=>(

                            <button className="w-full rounded-xl bg-brand-primary px-8 py-3 font-bold text-white hover:bg-brand-dark sm:w-auto">

                                {loading

                                    ? "Preparing PDF..."

                                    : "Download Certificate"}

                            </button>

                        )}

                    </PDFDownloadLink>


                </div>


            </div>


        </main>

    );

}
