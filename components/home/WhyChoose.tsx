import { GraduationCap, Music2, Users, Award } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Qualified Instruction",
    description: "Learn from experienced music educators committed to helping every student succeed."
  },
  {
    icon: Music2,
    title: "Practical Training",
    description: "Develop confidence through hands-on lessons, performances and continuous practice."
  },
  {
    icon: Award,
    title: "ABRSM Preparation",
    description: "Structured preparation for internationally recognised music examinations."
  },
  {
    icon: Users,
    title: "All Ages Welcome",
    description: "Children, adults, teachers, church musicians and beginners are all welcome."
  }
];

export default function WhyChoose() {
  return (
    <section className="bg-[#0B3C88] py-10 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            Why Choose Fermata?
          </h2>

<div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-blue-100">
            We combine professional instruction, practical experience and a passion
            for music to help every learner achieve excellence.
          </p>

        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-slate-50/10 p-5 backdrop-blur"
              >
                <Icon className="h-12 w-12 text-amber-400" />

                <h3 className="mt-6 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-blue-100">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

