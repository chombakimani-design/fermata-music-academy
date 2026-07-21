import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {

    const supabase = await createClient();

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();


    return (

        <main>

            <h1 className="text-4xl font-bold text-[#0B3C88]">
                Settings
            </h1>


            <p className="mt-2 text-slate-700">
                Manage Fermata Music Academy system settings.
            </p>



            <div className="mt-8 space-y-6">


                <div className="rounded-xl bg-white p-6 shadow">

                    <h2 className="text-xl font-bold text-slate-900">
                        Academy Information
                    </h2>


                    <div className="mt-4 space-y-2 text-slate-900">

                        <p>
                            Name: Fermata Music Academy
                        </p>

                        <p>
                            Payment Method: M-Pesa
                        </p>

                        <p>
                            Currency: Kenyan Shilling (KES)
                        </p>

                    </div>

                </div>



                <div className="rounded-xl bg-white p-6 shadow">

                    <h2 className="text-xl font-bold text-slate-900">
                        Admin Account
                    </h2>


                    <p className="mt-3 text-slate-900">
                        Logged in as: {user?.email}
                    </p>

                </div>



                <div className="rounded-xl bg-white p-6 shadow">

                    <h2 className="text-xl font-bold text-slate-900">
                        Future Configuration
                    </h2>


                    <ul className="mt-3 list-disc pl-6 text-slate-900">

                        <li>
                            SMS notifications
                        </li>

                        <li>
                            Email receipts
                        </li>

                        <li>
                            Payment gateway settings
                        </li>

                        <li>
                            Academic calendar
                        </li>

                    </ul>

                </div>


            </div>


        </main>

    );

}
