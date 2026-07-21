import Link from "next/link";

export default function NotFound() {

    return (

        <main className="flex min-h-screen items-center justify-center bg-brand-light p-6">

            <div className="max-w-lg rounded-2xl border border-brand-gold bg-white p-10 text-center shadow-xl">

                <h1 className="text-5xl font-black text-brand-dark">

                    404

                </h1>

                <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-brand-gold" />

                <h2 className="mt-6 text-2xl font-bold text-brand-primary">

                    Tutor page not found

                </h2>

                <p className="mt-4 text-slate-600">

                    The page you requested does not exist or has been moved.

                </p>

                <Link
                    href="/tutor/dashboard"
                    className="mt-8 inline-block rounded-lg bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"
                >

                    Return to Dashboard

                </Link>

            </div>

        </main>

    );

}
