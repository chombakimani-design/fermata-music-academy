export default function About() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          <div>

            <h2 className="text-5xl font-bold text-[#0B3C88]">
              About Fermata Music Academy
            </h2>

            <p className="mt-8 text-lg leading-9 text-slate-600">
              Fermata Music Academy is committed to nurturing musical talent through
              quality instruction, practical training and internationally recognised
              music education. Whether you are a beginner, a teacher, a church musician,
              or preparing for ABRSM examinations, we provide a structured learning
              experience tailored to your goals.
            </p>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              Our mission is to inspire creativity, discipline and excellence through
              music while building confident performers, educators and leaders.
            </p>

          </div>

          <div className="rounded-3xl bg-[#0B3C88] p-12 text-white shadow-2xl">

            <h3 className="text-3xl font-bold">
              Our Vision
            </h3>

            <p className="mt-6 text-lg leading-8">
              To become East Africa's leading centre for quality music education,
              performance and professional development.
            </p>

            <hr className="my-10 border-white/20"/>

            <h3 className="text-3xl font-bold">
              Our Mission
            </h3>

            <p className="mt-6 text-lg leading-8">
              Empowering individuals through world-class music education,
              creativity and performance.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
