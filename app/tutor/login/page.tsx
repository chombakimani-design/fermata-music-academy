import { login } from "./actions/login";
import Logo from "@/components/branding/Logo";

export default function TutorLoginPage() {

    return (

        <main className="flex min-h-screen items-center justify-center bg-brand-light p-6">

            <div className="w-full max-w-md rounded-2xl border border-brand-gold bg-white p-8 shadow-xl">

                <div className="flex justify-center">

                    <Logo width={180} height={80} />

                </div>

                <h1 className="mt-6 text-center text-3xl font-bold text-brand-dark">

                    Tutor Login

                </h1>

                <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-brand-gold" />

                <form
                    action={login}
                    className="mt-8 space-y-5"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="w-full rounded-lg border p-4"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full rounded-lg border p-4"
                    />

                    <button
                        className="w-full rounded-lg bg-brand-primary p-4 font-bold text-white hover:bg-brand-dark"
                    >

                        Sign In

                    </button>

                </form>

            </div>

        </main>

    );

}
