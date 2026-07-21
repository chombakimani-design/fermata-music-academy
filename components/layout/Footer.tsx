import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-brand-dark text-white">

            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">

                <div>

                    <h2 className="text-2xl font-bold text-brand-gold">
                        Fermata Music Academy
                    </h2>

                    <p className="mt-5 leading-8 text-slate-300">
                        Inspiring excellence in music through professional
                        instruction, creativity and performance.
                    </p>

                </div>

                <div>

                    <h3 className="text-xl font-semibold text-brand-gold">
                        Quick Links
                    </h3>

                    <div className="mt-5 flex flex-col gap-3">

                        <Link href="/" className="hover:text-brand-gold">
                            Home
                        </Link>

                        <Link href="#about" className="hover:text-brand-gold">
                            About
                        </Link>

                        <Link href="#courses" className="hover:text-brand-gold">
                            Courses
                        </Link>

                        <Link href="#contact" className="hover:text-brand-gold">
                            Contact
                        </Link>

                    </div>

                </div>

                <div>

                    <h3 className="text-xl font-semibold text-brand-gold">
                        Contact Us
                    </h3>

                    <div className="mt-5 space-y-3 text-slate-300">

                        <p>📞 +254 722 866 836</p>

                        <p>✉️ fermatamusicacademy@gmail.com</p>

                        <p>𝕏 @fermataAcademy</p>

                    </div>

                </div>

            </div>

            <div className="border-t border-white/10 py-6 text-center text-sm text-slate-400">

                © {year} Fermata Music Academy. All Rights Reserved.

            </div>

        </footer>
    );
}
