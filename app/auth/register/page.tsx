import Logo from "@/components/branding/Logo";
import { register } from "./actions/register";


export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {

    const { course } = await searchParams;

    return (

        <main className="min-h-screen bg-brand-light flex items-center justify-center p-6">


            <div className="w-full max-w-md rounded-2xl border border-brand-gold bg-white p-10 shadow-xl">


                <div className="flex flex-col items-center mb-8">


                    <Logo
                        width={180}
                        height={80}
                    />


                    <div className="mt-5 h-px w-full bg-brand-gold" />



                    <h1 className="mt-6 text-3xl font-bold text-brand-dark">
                        Student Registration
                    </h1>


                    <p className="mt-3 text-center text-slate-600">
                        Create your Fermata Music Academy account.
                    </p>


                </div>




                <form
                    action={register}
                    className="space-y-5">

                    <input
                        type="hidden"
                        name="course"
                        value={course ?? ""}
                    />



                    <div>

                        <label className="mb-2 block text-sm font-semibold text-brand-dark">
                            Full Name
                        </label>


                        <input
                            name="full_name"
                            type="text"
                            placeholder="Example: Peter Munga"
                            required
                            className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                        />

                    </div>




                    <div>

                        <label className="mb-2 block text-sm font-semibold text-brand-dark">
                            Phone Number
                        </label>


                        <input
                            name="phone"
                            type="tel"
                            placeholder="Example: 0712345678"
                            required
                            className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                        />

                    </div>





                    <div>

                        <label className="mb-2 block text-sm font-semibold text-brand-dark">
                            Password
                        </label>


                        <input
                            name="password"
                            type="password"
                            placeholder="Create Password"
                            required
                            className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                        />

                    </div>





                    <button
                        className="w-full rounded-lg bg-brand-primary p-4 font-bold text-white hover:bg-brand-gold hover:text-brand-dark transition"
                    >

                        Create Account

                    </button>



                </form>



            </div>


        </main>

    );

}



