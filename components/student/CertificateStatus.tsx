import { checkCourseCompletion } from "@/lib/student/completion";


export default async function CertificateStatus({

    studentId,

    courseId

}:{
    studentId:string;
    courseId:number;
}){


    const completed = await checkCourseCompletion(

        studentId,

        courseId

    );



    return (

        <div className="mt-5 rounded-xl border border-brand-gold bg-white p-5">


            <h3 className="font-bold text-brand-dark">

                Certificate Status

            </h3>



            <p className="mt-2 text-slate-600">


                {completed

                ? "Congratulations! You are eligible for a certificate ✓"

                : "Complete all lessons to become eligible for certification."}


            </p>


        </div>

    );

}
