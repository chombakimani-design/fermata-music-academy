import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { assignCourse } from "./actions/assign-course";
import { assignStudent } from "./actions/assign-student";
import { removeCourse } from "./actions/remove-course";
import { removeStudent } from "./actions/remove-student";

export default async function AssignmentPage({
    params
}:{
    params: Promise<{ id:string }>
}) {

    const { id } = await params;

    const supabase = await createClient();

    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();

    if(!user){

        redirect("/admin/login");

    }

    const { data:profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if(
        !profile ||
        (
            profile.role !== "admin" &&
            profile.role !== "super_admin"
        )
    ){

        redirect("/admin/login");

    }

    const { data:tutor } = await supabase
        .from("profiles")
        .select(`
            id,
            first_name,
            last_name,
            auth_email
        `)
        .eq("id", id)
        .eq("role","tutor")
        .single();

    if(!tutor){

        redirect("/admin/assignments");

    }

    const { data:courses } = await supabase
        .from("courses")
        .select(`
            id,
            course_name
        `)
        .eq("active", true)
        .order("course_name");

    const { data:students } = await supabase
        .from("profiles")
        .select(`
            id,
            first_name,
            last_name
        `)
        .eq("role","student")
        .order("first_name");

    const { data:assignedCourses } = await supabase
        .from("tutor_courses")
        .select(`
            id,
            courses(
                id,
                course_name,
                level,
                duration
            )
        `)
        .eq("tutor_id", tutor.id);

    const { data:assignedStudents } = await supabase
        .from("tutor_students")
        .select(`
            id,
            profiles!tutor_students_student_id_fkey(
                id,
                first_name,
                last_name,
                auth_email
            )
        `)
        .eq("tutor_id", tutor.id);

    return (

        <main>

            <div className="rounded-xl bg-white p-8 shadow">

                <h1 className="text-4xl font-bold text-brand-dark">

                    {tutor.first_name} {tutor.last_name}

                </h1>

                <p className="mt-2 text-slate-600">

                    {tutor.auth_email}

                </p>

            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">

                <section className="rounded-xl bg-white p-6 shadow">

                    <h2 className="text-2xl font-bold">

                        Assign Course

                    </h2>

                    <form
                        action={assignCourse}
                        className="mt-5 space-y-4"
                    >

                        <input
                            type="hidden"
                            name="tutorId"
                            value={tutor.id}
                        />

                        <select
                            name="courseId"
                            required
                            className="w-full rounded-lg border p-3"
                        >

                            <option value="">

                                Select Course

                            </option>

                            {courses?.map(course=>(

                                <option
                                    key={course.id}
                                    value={course.id}
                                >

                                    {course.course_name}

                                </option>

                            ))}

                        </select>

                        <button
                            className="rounded-lg bg-brand-primary px-6 py-3 font-bold text-white"
                        >

                            Assign Course

                        </button>

                    </form>

                </section>

                <section className="rounded-xl bg-white p-6 shadow">

                    <h2 className="text-2xl font-bold">

                        Assign Student

                    </h2>

                    <form
                        action={assignStudent}
                        className="mt-5 space-y-4"
                    >

                        <input
                            type="hidden"
                            name="tutorId"
                            value={tutor.id}
                        />

                        <select
                            name="studentId"
                            required
                            className="w-full rounded-lg border p-3"
                        >

                            <option value="">

                                Select Student

                            </option>

                            {students?.map(student => (

                                <option
                                    key={student.id}
                                    value={student.id}
                                >

                                    {student.first_name} {student.last_name}

                                </option>

                            ))}

                        </select>

                        <button
                            className="rounded-lg bg-brand-primary px-6 py-3 font-bold text-white"
                        >

                            Assign Student

                        </button>

                    </form>

                </section>

            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">

                <section className="rounded-xl bg-white p-6 shadow">

                    <h2 className="text-2xl font-bold">

                        Assigned Courses

                    </h2>

                    <div className="mt-4 space-y-3">

                        {assignedCourses?.map((item:any)=>(

                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-lg border border-brand-gold p-4"
                            >

                                <div>

                                    <p className="font-bold">

                                        {item.courses.course_name}

                                    </p>

                                    <p className="text-slate-500">

                                        {item.courses.level}

                                    </p>

                                </div>

                                <form action={removeCourse}>

                                    <input
                                        type="hidden"
                                        name="assignmentId"
                                        value={item.id}
                                    />

                                    <input
                                        type="hidden"
                                        name="tutorId"
                                        value={tutor.id}
                                    />

                                    <button
                                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
                                    >

                                        Remove

                                    </button>

                                </form>

                            </div>

                        ))}

                        {assignedCourses?.length === 0 && (

                            <p className="text-slate-500">

                                No courses assigned.

                            </p>

                        )}

                    </div>

                </section>


                <section className="rounded-xl bg-white p-6 shadow">

                    <h2 className="text-2xl font-bold">

                        Assigned Students

                    </h2>

                    <div className="mt-4 space-y-3">

                        {assignedStudents?.map((item:any)=>(

                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-lg border border-brand-gold p-4"
                            >

                                <div>

                                    <p className="font-bold">

                                        {item.profiles.first_name} {item.profiles.last_name}

                                    </p>

                                    <p className="text-slate-500">

                                        {item.profiles.auth_email}

                                    </p>

                                </div>

                                <form action={removeStudent}>

                                    <input
                                        type="hidden"
                                        name="assignmentId"
                                        value={item.id}
                                    />

                                    <input
                                        type="hidden"
                                        name="tutorId"
                                        value={tutor.id}
                                    />

                                    <button
                                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
                                    >

                                        Remove

                                    </button>

                                </form>

                            </div>

                        ))}

                        {assignedStudents?.length === 0 && (

                            <p className="text-slate-500">

                                No students assigned.

                            </p>

                        )}

                    </div>

                </section>

            </div>

        </main>

    );

}

