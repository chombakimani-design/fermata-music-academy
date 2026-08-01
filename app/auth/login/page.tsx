import Logo from "@/components/branding/Logo";
import { login } from "./actions/login";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>;
}) {
    const { next } = await searchParams;

    return (
        <main className="flex min-h-screen items-center justify-center bg-brand-light p-6">
            <div className="w-full max-w-md rounded-2xl border-t-8 border-brand-gold bg-white p-10 shadow-xl">
                <div className="mb-8 flex flex-col items-center">
                    <Logo
                        width={200}
                        height={90}
                    />

                    <div className="mt-5 h-px w-full bg-brand-gold" />

                    <h1 className="mt-6 text-3xl font-bold text-brand-dark">
                        Student Login
                    </h1>

                    <p className="mt-2 text-center text-slate-600">
                        Access your Fermata Music Academy account
                    </p>
                </div>

                <form
                    action={login}
                    className="space-y-5"
                >
                    <input
                        type="hidden"
                        name="next"
                        value={next ?? ""}
                    />

                    <div>
                        <label className="mb-2 block font-semibold text-brand-dark">
                            Student ID
                        </label>

                        <input
                            name="student_id"
                            type="text"
                            placeholder="Example: FMA260005"
                            required
                            className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-brand-dark">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            placeholder="Your password"
                            required
                            className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                        />
                    </div>

                    <button className="w-full rounded-lg bg-brand-primary p-4 font-bold text-white transition hover:bg-brand-dark">
                        Login
                    </button>
                </form>

                <div className="mt-8 border-t pt-6 text-center">
                    <p className="text-slate-600">
                        New student?
                    </p>

                    <a
                        href="/auth/register"
                        className="mt-2 inline-block font-bold text-brand-primary hover:text-brand-gold"
                    >
                        Create your account
                    </a>
                </div>
            </div>
        </main>
    );
}
