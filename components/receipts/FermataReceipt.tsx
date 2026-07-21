import Logo from "@/components/branding/Logo";

export default function FermataReceipt({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="mx-auto max-w-3xl p-10">

            <div className="rounded-xl border bg-white p-10 shadow">


                <div className="flex flex-col items-center border-b pb-6">

                    <Logo width={180} height={80} />

                    <div className="mt-4 h-px w-full bg-brand-gold" />

                    <h1 className="mt-4 text-3xl font-bold text-brand-dark">
                        Fermata Music Academy
                    </h1>

                    <p className="mt-2 text-slate-700">
                        Official Payment Receipt
                    </p>

                </div>


                {children}


                <div className="mt-10 border-t pt-6 text-center text-slate-600">

                    <p>
                        Thank you for choosing Fermata Music Academy.
                    </p>

                    <p className="mt-1 text-sm">
                        This receipt confirms successful payment.
                    </p>

                </div>


            </div>

        </main>
    );
}
