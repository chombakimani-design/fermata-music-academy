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
        <section className="bg-white py-10">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 px-5 py-2 font-semibold text-amber-700">
                        Professional Music Programmes
                    </span>

                    <h2 className="mt-6 text-4xl font-extrabold text-[#0B3C88]">
                        Our Courses
                    </h2>

<div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>

                    <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-600">
                        From beginners to professional musicians, discover
                        programmes designed to unlock your musical potential.
                    </p>

                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                    {courses.map((course) => (

                        <div
                            key={course.id}
                            className="group rounded-2xl border-2 border-amber-300 bg-white p-3 shadow-lg transition duration-300 hover:-translate-y-3 hover:border-yellow-500 hover:shadow-2xl"
                        >

                            <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-amber-700">
                                Course
                            </div>

                            <h3 className="text-2xl font-bold text-[#0B3C88]">
                                {course.name}
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                {course.description ?? "Professional music training tailored for every learner."}
                            </p>

                            <div className="mt-5 flex items-center gap-3 border-t border-amber-100 pt-4">

                                <span className="text-2xl font-extrabold text-amber-600">
                                    {course.fee
                                        ? `KES ${course.fee.toLocaleString()}`
                                        : "Contact Us"}
                                </span>

                                <button className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 font-semibold text-white transition hover:bg-amber-600">
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



