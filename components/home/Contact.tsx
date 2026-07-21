import { Mail, Phone, Music } from "lucide-react";

export default function Contact() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-6xl px-6 text-center">

        <h2 className="text-5xl font-bold text-[#0B3C88]">
          Contact Us
        </h2>

        <p className="mt-6 text-xl text-slate-600">
          We'd love to hear from you.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl border p-10 shadow-lg">
            <Phone className="mx-auto h-10 w-10 text-amber-500"/>
            <h3 className="mt-6 text-2xl font-bold">WhatsApp</h3>
            <p className="mt-3 text-slate-600">
              +254 722 866 836
            </p>
          </div>

          <div className="rounded-2xl border p-10 shadow-lg">
            <Music className="mx-auto h-10 w-10 text-amber-500"/>
            <h3 className="mt-6 text-2xl font-bold">X</h3>
            <p className="mt-3 text-slate-600">
              @fermataAcademy
            </p>
          </div>

          <div className="rounded-2xl border p-10 shadow-lg">
            <Mail className="mx-auto h-10 w-10 text-amber-500"/>
            <h3 className="mt-6 text-2xl font-bold">Email</h3>
            <p className="mt-3 text-slate-600 break-all">
              fermatamusicacademy@gmail.com
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
