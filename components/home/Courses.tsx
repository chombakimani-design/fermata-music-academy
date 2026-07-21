type Course = {
    id: number;
    name: string;
    description: string | null;
    fee: number | null;
};

export default function Courses({
    courses,
}: {
    courses: Course[];
}) {
    return (
        <section className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <h2 className="text-5xl font-bold text-[#0B3C88]">
                        Our Courses
                    </h2>

                    <p className="mt-6 text-xl text-slate-600">
                        Explore our professionally designed music programmes.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {courses.map((course) => (

                        <div
                            key={course.id}
                            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
                        >

                            <h3 className="text-2xl font-bold text-[#0B3C88]">
                                {course.name}
                            </h3>

                            <p className="mt-5 min-h-28 leading-8 text-slate-600">
                                {course.description || "Professional music training."}
                            </p>

                            {course.fee && (
                                <div className="mt-6 border-t pt-4">

                                    <span className="text-2xl font-bold text-amber-600">
                                        KES {course.fee.toLocaleString()}
                                    </span>

                                </div>
                            )}

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}
