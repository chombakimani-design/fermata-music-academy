import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C88] via-[#1457B8] to-[#0A234F] text-white">

            <div className="absolute inset-0 opacity-10">
                <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-amber-400 blur-3xl"></div>
                <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
            </div>

            <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

                <div>

                    <span className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900">
                        Excellence in Music Education
                    </span>

                    <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
                        Discover.
                        <br />
                        Learn.
                        <br />
                        Perform.
                    </h1>

                    <p className="mt-8 max-w-xl text-xl leading-9 text-blue-100">
                        Join Fermata Music Academy and receive professional music
                        training from experienced tutors in piano, violin, guitar,
                        recorder, church music, children's music and ABRSM preparation.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-5">

                        <Link
                            href="/auth/register"
                            className="rounded-full bg-amber-500 px-8 py-4 font-bold text-white transition hover:scale-105 hover:bg-amber-600"
                        >
                            Enrol Today
                        </Link>

                        <a
                            href="#courses"
                            className="rounded-full border-2 border-white px-8 py-4 font-bold transition hover:bg-white hover:text-[#0B3C88]"
                        >
                            View Courses
                        </a>

                    </div>

                    <div className="mt-12 flex flex-wrap gap-8">

                        <div>
                            <h3 className="text-3xl font-bold text-amber-400">
                                7+
                            </h3>
                            <p className="text-blue-100">
                                Professional Courses
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-amber-400">
                                ABRSM
                            </h3>
                            <p className="text-blue-100">
                                International Preparation
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-amber-400">
                                All Ages
                            </h3>
                            <p className="text-blue-100">
                                Children & Adults
                            </p>
                        </div>

                    </div>

                </div>

                <div className="flex justify-center">

                    <div className="rounded-3xl bg-white p-8 shadow-2xl">

                        <img
                            src="/images/fermata-logo.png"
                            alt="Fermata Music Academy"
                            className="w-[420px]"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}
