import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-amber-50">

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-24 lg:grid-cols-2">

        <div>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
            Professional Music Education
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-[#0B3C88]">
            Discover Your Musical Potential
          </h1>

          <p className="mt-8 text-xl leading-9 text-slate-600">
            Fermata Music Academy offers professional music education for
            children, adults, teachers, church musicians and anyone passionate
            about mastering music.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/register"
              className="rounded-full bg-[#0B3C88] px-8 py-4 font-semibold text-white transition hover:bg-blue-900"
            >
              Register Now
            </Link>

            <Link
              href="/courses"
              className="rounded-full border-2 border-[#0B3C88] px-8 py-4 font-semibold text-[#0B3C88] transition hover:bg-[#0B3C88] hover:text-white"
            >
              Explore Courses
            </Link>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src="/images/logo.png"
            alt="Fermata Music Academy"
            className="w-[420px] drop-shadow-2xl"
          />

        </div>

      </div>

    </section>
  );
}
