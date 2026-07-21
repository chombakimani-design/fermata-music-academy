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
        <section className="bg-gradient-to-b from-white to-amber-50 py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-amber-100 px-5 py-2 font-semibold text-amber-700">
                        Professional Music Programmes
                    </span>

                    <h2 className="mt-6 text-5xl font-extrabold text-[#0B3C88]">
                        Our Courses
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-600">
                        From beginners to professional musicians, discover
                        programmes designed to unlock your musical potential.
                    </p>

                </div>

                <div className="mt-20 grid gap-10 md:grid-cols-2 xl:grid-cols-3">

                    {courses.map((course) => (

                        <div
                            key={course.id}
                            className="group rounded-3xl border-2 border-amber-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-3 hover:border-amber-500 hover:shadow-2xl"
                        >

                            <div className="mb-6 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-bold uppercase tracking-wide text-amber-700">
                                Course
                            </div>

                            <h3 className="text-3xl font-bold text-[#0B3C88]">
                                {course.name}
                            </h3>

                            <p className="mt-5 min-h-28 leading-8 text-slate-600">
                                {course.description ?? "Professional music training tailored for every learner."}
                            </p>

                            <div className="mt-8 flex items-center justify-between border-t border-amber-100 pt-6">

                                <span className="text-3xl font-extrabold text-amber-600">
                                    {course.fee
                                        ? `KES ${course.fee.toLocaleString()}`
                                        : "Contact Us"}
                                </span>

                                <button className="rounded-full bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600">
                                    Enrol
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}
