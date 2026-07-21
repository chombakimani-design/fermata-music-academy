export default function Testimonials() {
    const testimonials = [
        {
            name: "Parent",
            text: "Fermata Music Academy transformed our daughter's confidence and musical ability. The instructors are exceptional.",
        },
        {
            name: "Piano Student",
            text: "The structured lessons and ABRSM preparation helped me achieve results beyond my expectations.",
        },
        {
            name: "Church Musician",
            text: "The academy gave me practical skills that I now use every week in ministry and performance.",
        },
    ];

    return (
        <section className="bg-white py-20">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-amber-100 px-5 py-2 font-semibold text-amber-700">
                        Testimonials
                    </span>

                    <h2 className="mt-6 text-5xl font-extrabold text-[#0B3C88]">
                        What Our Students Say
                    </h2>

                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">

                    {testimonials.map((item) => (

                        <div
                            key={item.name}
                            className="rounded-3xl border-2 border-yellow-300 bg-gradient-to-b from-white to-amber-50 p-8 shadow-lg"
                        >

                            <div className="mb-6 text-3xl text-yellow-500">
                                ⭐⭐⭐⭐⭐
                            </div>

                            <p className="leading-8 text-slate-600">
                                "{item.text}"
                            </p>

                            <div className="mt-8 font-bold text-[#0B3C88]">
                                {item.name}
                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}
