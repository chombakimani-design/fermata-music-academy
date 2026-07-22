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

                <div className="mt-8 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-amber-200 bg-white px-8 py-5 shadow">

                    <a
                        href="https://wa.me/254722866836"
                        target="_blank"
                        className="font-semibold text-slate-700 transition hover:text-green-600"
                    >
                        📱 WhatsApp: +254 722 866 836
                    </a>

                    <a
                        href="https://x.com/fermataAcademy"
                        target="_blank"
                        className="font-semibold text-slate-700 transition hover:text-[#1DA1F2]"
                    >
                        ✖ @fermataAcademy
                    </a>

                    <a
                        href="mailto:fermatamusicacademy@gmail.com"
                        className="font-semibold text-slate-700 transition hover:text-amber-600"
                    >
                        ✉ fermatamusicacademy@gmail.com
                    </a>

                </div>

            </div>

        </section>
    );
}
