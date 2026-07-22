import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[72vh] overflow-hidden text-white">

            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/hero-music.png')",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/75" />

            <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

                <img
                    src="/images/fermata-logo.png"
                    alt="Fermata Music Academy"
                    className="mb-5 w-28 md:w-36 lg:w-44 drop-shadow-2xl"
                />

                <span className="rounded-full bg-amber-400 px-5 py-2 text-sm font-bold tracking-wide text-slate-900">
                    Excellence in Music Education
                </span>

                <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
                    Where Passion
                    <br />
                    Meets Performance
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 md:text-xl">
                    Discover your musical potential through professional instruction
                    in piano, violin, voice, guitar, recorder, church music,
                    children's music and ABRSM examination preparation.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-5">

                    <Link
                        href="/auth/register"
                        className="rounded-full bg-amber-500 px-6 py-3 font-bold text-slate-900 transition hover:scale-105 hover:bg-amber-400"
                    >
                        Enrol Today
                    </Link>

                    <a
                        href="#courses"
                        className="rounded-full border-2 border-white px-6 py-3 font-bold transition hover:bg-white hover:text-slate-900"
                    >
                        View Courses
                    </a>

                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-8">

                    <div>
                        <h3 className="text-2xl font-bold text-amber-400">7+</h3>
                        <p>Professional Courses</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-amber-400">ABRSM</h3>
                        <p>International Preparation</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-amber-400">All Ages</h3>
                        <p>Children & Adults</p>
                    </div>

                </div>

            </div>

        </section>
    );
}

