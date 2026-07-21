import Link from "next/link";
import Logo from "@/components/branding/Logo";

export default function StudentLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (

        <div className="min-h-screen bg-brand-light md:flex">


            <aside className="w-full bg-brand-dark p-6 text-white md:min-h-screen md:w-72">


                <div className="flex flex-col items-center">

                    <Logo width={170} height={75} />

                    <div className="mt-4 h-px w-full bg-brand-gold" />

                    <p className="mt-4 text-sm text-blue-100">
                        Student Portal
                    </p>

                </div>



                <nav className="mt-8 space-y-3">


                    <Link
                        href="/student/dashboard"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        🏠 Dashboard
                    </Link>


                    <Link
                        href="/student/my-courses"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        📚 My Courses
                    </Link>


                    <Link
                        href="/student/payments"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        💳 Submit Payment
                    </Link>


                    <Link
                        href="/student/payments/history"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        🧾 Payment History
                    </Link>


                    <Link
                        href="/auth/logout"
                        className="block rounded-lg p-3 font-semibold hover:bg-brand-primary"
                    >
                        🚪 Logout
                    </Link>


                </nav>


            </aside>



            <section className="flex-1 p-8">

                {children}

            </section>


        </div>

    );

}
