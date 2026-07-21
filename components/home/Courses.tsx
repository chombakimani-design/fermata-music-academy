import { courses } from "@/constants/courses";

export default function Courses() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-[#0B3C88]">
            What We Offer
          </h2>

          <p className="mt-6 text-xl text-slate-600">
            Professional music education for every stage of your musical journey.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {courses.map((course) => (

            <div
              key={course.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <h3 className="text-2xl font-bold text-[#0B3C88]">
                {course.title}
              </h3>

              <p className="mt-5 leading-8 text-slate-600">
                {course.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
