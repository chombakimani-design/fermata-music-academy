export default function Stats() {
    const stats = [
        { value: "500+", label: "Students Trained" },
        { value: "7+", label: "Professional Courses" },
        { value: "10+", label: "Expert Tutors" },
        { value: "100%", label: "Practical Learning" },
    ];

    return (
        <section className="bg-[#0B3C88] py-20 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 text-center md:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <h2 className="text-5xl font-extrabold text-amber-400">
                            {stat.value}
                        </h2>

                        <p className="mt-4 text-lg text-blue-100">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
