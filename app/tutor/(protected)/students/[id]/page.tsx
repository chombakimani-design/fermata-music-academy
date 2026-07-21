import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function TutorStudentPage({ params }: Props) {

    const { id } = await params;

    const supabase = await createClient();

    const { data:{ user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/tutor/login");
    }


    const { data: student } = await supabase
        .from("profiles")
        .select(`
            first_name,
            last_name,
            student_id
        `)
        .eq("id", id)
        .single();


    const { data: courses } = await supabase
        .from("student_courses")
        .select(`
            competence_level,
            availability,
            payment_status,
            courses(
                course_name
            )
        `)
        .eq("student_id", id);


    const { data: tutorAssignment } = await supabase
        .from("tutor_students")
        .select(`
            assigned_at
        `)
        .eq("student_id", id)
        .single();


    const { data: assessments } = await supabase
        .from("assessments")
        .select(`
            assessment_number,
            assessment_type,
            subject,
            assessment_date,
            score,
            remarks,
            courses(
                course_name
            )
        `)
        .eq("student_id", id)
        .order("assessment_number");

    const internalCompleted =
        assessments?.filter(
            (item:any) => item.assessment_type === 'Internal'
        ).length ?? 0;

    const progressPercentage =
        Math.min((internalCompleted / 6) * 100, 100);

    const nextStep =
        internalCompleted < 6
            ? `Internal ${internalCompleted + 1}`
            : 'External Assessment';



    return (
        <main className="space-y-6">


            <div className="rounded-xl border border-brand-gold bg-white p-8 shadow">

                <h1 className="text-3xl font-bold text-brand-dark">
                    {student?.first_name} {student?.last_name}
                </h1>

                <p className="mt-2 text-slate-600">
                    Student ID: {student?.student_id}
                </p>

            </div>



            <div className="rounded-xl border bg-white p-8 shadow">

                <h2 className="text-xl font-bold mb-4">
                    Enrolled Courses
                </h2>

                {courses?.map((item:any) => (

                    <div
                        key={item.courses.course_name}
                        className="border-b py-3"
                    >

                        <p className="font-semibold">
                            {item.courses.course_name}
                        </p>

                        <p className="text-sm text-slate-600">
                            Level: {item.competence_level}
                        </p>

                        <p className="text-sm text-slate-600">
                            Availability: {item.availability}
                        </p>

                        <p className="text-sm text-slate-600">
                            Payment: {item.payment_status}
                        </p>

                    </div>

                ))}

            </div>



            <div className="rounded-xl border bg-white p-8 shadow">

                <h2 className="text-xl font-bold mb-4">
                    Tutor Assignment
                </h2>

                <p className="text-slate-600">

                    Assigned:
                    {" "}

                    {tutorAssignment?.assigned_at
                        ? new Date(tutorAssignment.assigned_at).toLocaleDateString()
                        : "Not assigned"}

                </p>

            </div>

            <div className="rounded-xl border border-brand-gold bg-white p-8 shadow">

                <h2 className="text-xl font-bold mb-4 text-brand-primary">
                    Assessment Progress
                </h2>

                <div className="flex justify-between mb-3 text-sm">

                    <span>
                        Internal Assessments
                    </span>

                    <span className="font-semibold">
                        {internalCompleted} / 6
                    </span>

                </div>

                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

                    <div
                        className="h-3 rounded-full bg-brand-gold"
                        style={{ width: `${progressPercentage}%` }}
                    />

                </div>

                <p className="mt-4 text-sm text-slate-600">
                    Next:
                    {" "}
                    <span className="font-semibold text-brand-primary">
                        {nextStep}
                    </span>
                </p>

            </div>

                <div className="rounded-xl border border-brand-primary/20 bg-white p-8 shadow">

                <div className="flex justify-between items-center mb-4">

                    <div>

                        <h2 className="text-xl font-bold text-brand-primary">
                            Assessment History
                        </h2>

                        <div className="mt-2 h-1 w-16 rounded-full bg-brand-gold"></div>

                    </div>
                    <Link
                        href={`/tutor/students/${id}/assessment/new`}
                        className="rounded-lg bg-brand-gold px-4 py-2 font-semibold text-brand-dark shadow-sm hover:opacity-90"
                    >
                        Add Assessment
                    </Link>

                </div>


                {assessments && assessments.length > 0 ? (

                    assessments.map((assessment:any) => (
                        <div
                            key={assessment.assessment_number}
                            className="rounded-xl border border-brand-primary/20 bg-white p-4 mb-3 shadow-sm"
                        >

                            <div className="flex justify-between items-center mb-3">

                                <p className="font-bold text-brand-primary">
                                    Internal {assessment.assessment_number}
                                </p>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        assessment.assessment_type === "External"
                                            ? "bg-brand-gold text-brand-dark"
                                            : "bg-brand-primary text-white"
                                    }`}
                                >
                                    {assessment.assessment_type}
                                </span>


                                <p>
                                    <span className="text-slate-500">Assessor:</span>
                                    {" "}{assessment.assessor_name ?? "Not recorded"}
                                </p>

                                <p className="col-span-2">
                                    <span className="text-slate-500">Remarks:</span>
                                    {" "}{assessment.remarks ?? "No remarks"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 rounded-lg p-4">

                                <p>
                                    <span className="text-slate-500">Course:</span>
                                    {" "}{assessment.courses?.[0]?.course_name}
                                </p>

                                <p>
                                    <span className="text-slate-500">Subject:</span>
                                    {" "}{assessment.subject}
                                </p>

                                <p>
                                    <span className="text-slate-500">Date:</span>
                                    {" "}{assessment.assessment_date}
                                </p>

                                <p>
                                    <span className="text-slate-500">Score:</span>
                                    {" "}{assessment.score ?? "Not graded"}
                                </p>

                                <p>
                                    <span className="text-slate-500">Assessor:</span>
                                    {" "}{assessment.assessor_name ?? "Not recorded"}
                                </p>

                                <p className="col-span-2">
                                    <span className="text-slate-500">Remarks:</span>
                                    {" "}{assessment.remarks ?? "No remarks"}
                                </p>

                            </div>

                        </div>

                    ))

                ) : (

                    <p className="text-slate-600">
                        No assessments recorded yet.
                    </p>

                )}

            </div>


        </main>
    );
}


