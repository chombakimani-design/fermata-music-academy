import Link from "next/link";
import Logo from "@/components/branding/Logo";
import CourseOutline from "@/components/student/CourseOutline";
import CourseProgress from "@/components/student/CourseProgress";
import CourseResources from "@/components/student/CourseResources";
import CourseCompletion from "@/components/student/CourseCompletion";
import CertificateStatus from "@/components/student/CertificateStatus";
import CertificateLink from "@/components/student/CertificateLink";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getNextLesson } from "@/lib/student/learning";


export default async function MyCoursesPage(){


    const supabase = await createClient();



    const {
        data:{user}
    } = await supabase.auth.getUser();



    if(!user){

        redirect("/auth/login");

    }



    const {data:courses}=await supabase
        .from("student_courses")
        .select(`
            id,
            course_id,
            courses(
                course_name,
                level
            )
        `)
        .eq("student_id",user.id);



    return (

        <main className="min-h-screen bg-brand-light p-6">


            <div className="mx-auto max-w-6xl">


                <div className="rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">


                    <div className="flex justify-center">

                        <Logo

                            width={180}

                            height={80}

                        />

                    </div>



                    <h1 className="mt-8 text-4xl font-bold text-brand-dark">

                        My Courses

                    </h1>



                    <p className="mt-3 text-slate-600">

                        Continue learning and track your progress.

                    </p>


                </div>




                <div className="mt-8 space-y-8">


                    {courses?.map(async(item:any)=>{


                        const nextLesson = await getNextLesson(

                            user.id,

                            item.course_id

                        );



                        return (

                            <div

                                key={item.id}

                                className="rounded-2xl border border-brand-gold bg-white p-8 shadow-lg"

                            >


                                <h2 className="text-2xl font-bold text-brand-primary">

                                    {item.courses?.course_name}

                                </h2>



                                <p className="mt-2 text-slate-600">

                                    Level:
                                    {" "}
                                    {item.courses?.level}

                                </p>




                                <CourseProgress

                                    studentId={user.id}

                                    courseId={item.course_id}

                                />




                                <CourseCompletion

                                    studentId={user.id}

                                    courseId={item.course_id}

                                />




                                <CertificateStatus

                                    studentId={user.id}

                                    courseId={item.course_id}

                                />




                                <CertificateLink

                                    studentId={user.id}

                                    courseId={item.course_id}

                                />




                                <CourseOutline

                                    courseId={item.course_id}

                                />




                                <CourseResources

                                    courseId={item.course_id}

                                />




                                <div className="mt-8">


                                    <Link

                                        href={
                                            nextLesson
                                            ? `/student/lessons/${nextLesson.id}`
                                            : "#"
                                        }

                                        className="inline-block rounded-xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"

                                    >

                                        Continue Learning

                                    </Link>


                                </div>


                            </div>

                        );


                    })}



                    {(!courses || courses.length===0) && (

                        <div className="rounded-xl bg-white p-10 text-center shadow">

                            No courses assigned yet.

                        </div>

                    )}


                </div>


            </div>


        </main>

    );

}
