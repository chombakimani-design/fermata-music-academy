import { Mail } from "lucide-react";

export default function Contact() {
    return (
        <section className="bg-slate-50 py-10">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <h2 className="text-4xl font-extrabold text-[#0B3C88]">
                        Contact Us
                    </h2>

                    <p className="mt-3 text-slate-600">
                        We'd love to hear from you.
                    </p>

                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-amber-300 bg-white px-8 py-6 shadow-lg">

                    <a
                        href="https://wa.me/254722866836"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-full border border-green-200 bg-green-50 px-5 py-3 text-lg font-bold text-slate-800 transition hover:scale-105 hover:bg-green-100"
                    >
                        <img src="/icons/whatsapp.svg" alt="WhatsApp" className="h-8 w-8" />
                        <span>+254 722 866 836</span>
                    </a>

                    <a
                        href="https://x.com/fermataAcademy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-full border border-slate-300 bg-slate-100 px-5 py-3 text-lg font-bold text-slate-800 transition hover:scale-105 hover:bg-slate-200"
                    >
                        <img
                            src="/icons/x.svg"
                            alt="X"
                            className="h-8 w-8"
                        />
                        <span>@fermataAcademy</span>
                    </a>

                    <a
                        href="mailto:fermatamusicacademy@gmail.com"
                        className="flex items-center gap-3 rounded-full border border-amber-200 bg-amber-50 px-5 py-3 text-lg font-bold text-slate-800 transition hover:scale-105 hover:bg-amber-100"
                    >
                        <Mail className="h-8 w-8 text-amber-600" />
                        <span>fermatamusicacademy@gmail.com</span>
                    </a>

                </div>

            </div>

        </section>
    );
}



