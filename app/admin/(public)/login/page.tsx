import { login } from "./actions/login";

export default function AdminLoginPage() {

    return (

        <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-200">

                <h1 className="text-center text-3xl font-bold text-[#0B3C88]">
                    Fermata Music Academy
                </h1>

                <p className="mt-2 text-center text-slate-700">
                    Super Administrator Login
                </p>

                <form
                    action={login}
                    className="mt-8 space-y-5"
                >

                    <div>

                        <label className="mb-2 block font-semibold text-slate-800">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="admin@fermatamusic.ac.ke"
                            className="w-full rounded-lg border border-slate-300 bg-white p-4 text-black placeholder:text-slate-400 outline-none focus:border-[#0B3C88] focus:ring-2 focus:ring-[#0B3C88]"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold text-slate-800">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-slate-300 bg-white p-4 text-black placeholder:text-slate-400 outline-none focus:border-[#0B3C88] focus:ring-2 focus:ring-[#0B3C88]"
                        />

                    </div>

                    <button
                        className="w-full rounded-lg bg-[#0B3C88] p-4 font-bold text-white transition hover:bg-[#082d66]"
                    >
                        Login
                    </button>

                </form>

            </div>

        </main>

    );

}
