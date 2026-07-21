import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function StudentsPage() {

    const supabase = await createClient();


    const { data: students } = await supabase
        .from("profiles")
        .select(`
            id,
            student_id,
            first_name,
            last_name,
            auth_email,
            role
        `)
        .eq("role", "student")
        .order("student_id", {
            ascending: true
        });



    return (

        <main>


            <h1 className="text-4xl font-bold text-[#0B3C88]">

                Manage Students

            </h1>


            <p className="mt-2 text-slate-700">

                View registered Fermata Music Academy students.

            </p>



            <div className="mt-8 overflow-hidden rounded-xl border bg-white shadow">


                <table className="min-w-full">


                    <thead className="bg-[#0B3C88] text-white">


                        <tr>

                            <th className="px-6 py-4 text-left">
                                Student ID
                            </th>

                            <th className="px-6 py-4 text-left">
                                Name
                            </th>

                            <th className="px-6 py-4 text-left">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left">
                                Role
                            </th>

                            <th className="px-6 py-4 text-center">
                                Action
                            </th>

                        </tr>


                    </thead>



                    <tbody>


                        {students?.map((student) => (


                            <tr
                                key={student.id}
                                className="border-b hover:bg-slate-50"
                            >


                                <td className="px-6 py-4 font-semibold text-slate-900">

                                    {student.student_id}

                                </td>



                                <td className="px-6 py-4 text-slate-900">

                                    {student.first_name}{" "}
                                    {student.last_name}

                                </td>



                                <td className="px-6 py-4 text-slate-900">

                                    {student.auth_email}

                                </td>



                                <td className="px-6 py-4 text-slate-900">

                                    {student.role}

                                </td>



                                <td className="px-6 py-4 text-center">


                                    <Link
                                        href={`/admin/students/${student.id}`}
                                        className="rounded-lg bg-[#0B3C88] px-4 py-2 font-semibold text-white"
                                    >

                                        View

                                    </Link>


                                </td>


                            </tr>


                        ))}



                        {students?.length === 0 && (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="p-8 text-center text-slate-500"
                                >

                                    No students found.

                                </td>

                            </tr>

                        )}


                    </tbody>


                </table>


            </div>


        </main>

    );

}
