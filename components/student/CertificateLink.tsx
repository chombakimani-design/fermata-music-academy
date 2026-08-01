import Link from "next/link";
import { checkCourseCompletion } from "@/lib/student/completion";


export default async function CertificateLink({

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



    if(!completed){

        return null;

    }



    return (

        <Link

            href={`/student/certificates/${courseId}`}

            className="mt-5 inline-block rounded-xl border border-brand-gold bg-brand-light px-6 py-3 font-bold text-brand-dark hover:bg-brand-gold"

        >

            View Certificate

        </Link>

    );

}
