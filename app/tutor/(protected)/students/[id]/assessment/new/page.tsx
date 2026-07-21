import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AssessmentForm from "./AssessmentForm";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function NewAssessmentPage({ params }: Props) {

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
            course_id,
            courses(
                course_name
            )
        `)
        .eq("student_id", id);



    const { data: assessments } = await supabase
        .from("assessments")
        .select(`
            assessment_number,
            assessment_type
        `)
        .eq("student_id", id);



    const completedInternal = assessments
        ?.filter(item => item.assessment_type === "Internal")
        .map(item => item.assessment_number)
        ?? [];



    let nextAssessment = 1;


    while (completedInternal.includes(nextAssessment) && nextAssessment <= 6) {
        nextAssessment++;
    }



    const externalReady = nextAssessment > 6;



    return (

        <main className="space-y-6">


            <div className="rounded-xl border border-brand-gold bg-white p-8 shadow">

                <h1 className="text-3xl font-bold text-brand-dark">
                    Add Assessment
                </h1>

                <p className="mt-2 text-slate-600">
                    {student?.first_name} {student?.last_name}
                    {" "}
                    ({student?.student_id})
                </p>

            </div>



            <div className="rounded-xl border bg-white p-8 shadow">

                <AssessmentForm
                    studentId={id}
                    courses={courses ?? []}
                    nextAssessment={nextAssessment}
                    externalReady={externalReady}
                />

            </div>


        </main>

    );

}
