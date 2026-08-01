import Logo from "@/components/branding/Logo";
import { login } from "./actions/login";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>;
}) {

    const { next } = await searchParams;

    return (

        <main className="flex min-h-screen items-center justify-center bg-brand-light px-3 py-5">

            <div className="w-full max-w-sm rounded-2xl border-t-4 border-brand-gold bg-white p-5 shadow-xl sm:p-7">

                <div className="flex flex-col items-center">

                    <Logo width={120} height={55}/>

                    <div className="mt-3 h-px w-full bg-brand-gold"/>

                    <h1 className="mt-4 text-xl font-bold text-brand-dark sm:text-2xl">
                        Student Login
                    </h1>

                    <p className="mt-1 text-center text-xs text-slate-600 sm:text-sm">
                        Access your Fermata Music Academy account
                    </p>

                </div>


                <form action={login} className="mt-5 space-y-3">

                    <input
                        type="hidden"
                        name="next"
                        value={next ?? ""}
                    />

                    <div>

                        <label className="mb-1 block text-sm font-semibold text-brand-dark">
                            Student ID
                        </label>

                        <input
                            name="student_id"
                            required
                            placeholder="FMA260005"
                            className="w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 focus:ring-brand-gold"
                        />

                    </div>


                    <div>

                        <label className="mb-1 block text-sm font-semibold text-brand-dark">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            className="w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 focus:ring-brand-gold"
                        />

                    </div>


                    <button
                        className="w-full rounded-lg bg-brand-primary py-3 text-sm font-bold text-white hover:bg-brand-dark"
                    >
                        Login
                    </button>

                </form>


                <div className="mt-4 border-t pt-3 text-center text-sm">

                    <p className="text-slate-600">
                        New student?
                    </p>

                    <a
                        href="/auth/register"
                        className="font-bold text-brand-primary hover:text-brand-gold"
                    >
                        Create account
                    </a>

                </div>

            </div>

        </main>

    );
}
