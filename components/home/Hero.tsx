import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-amber-50">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">

                <div>

                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        Professional Music Education Since Day One
                    </span>

                    <h1 className="mt-8 text-5xl font-extrabold leading-tight text-brand-dark lg:text-6xl">
                        Unlock Your Musical Potential
                    </h1>

                    <p className="mt-8 text-lg leading-8 text-slate-600">
                        Learn Piano, Guitar, Violin, Recorder, Music Theory,
                        Church Music and ABRSM preparation from experienced
                        instructors at Fermata Music Academy.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <Link
                            href="/auth/register"
                            className="rounded-full bg-brand-primary px-8 py-4 font-semibold text-white transition hover:opacity-90"
                        >
                            Start Learning
                        </Link>

                        <Link
                            href="#courses"
                            className="rounded-full border-2 border-brand-primary px-8 py-4 font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
                        >
                            Explore Courses
                        </Link>

                    </div>

                </div>

                <div className="flex justify-center">

                    <img
                        src="/images/fermata-logo.png"
                        alt="Fermata Music Academy"
                        className="w-[420px] drop-shadow-2xl"
                    />

                </div>

            </div>
        </section>
    );
}
