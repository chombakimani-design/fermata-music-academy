import { createClient } from "@/lib/supabase/server";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Courses from "@/components/home/Courses";
import WhyChoose from "@/components/home/WhyChoose";
import Contact from "@/components/home/Contact";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";

export default async function Home() {

    const supabase = await createClient();

    const { data } = await supabase
        .from("courses")
        .select("*")
        .order("id");

    const courses = data ?? [];

    return (
        <main className="min-h-screen bg-white scroll-smooth">

            <Navbar />

            <Hero />

            <Stats />

            <section id="about">
                <About />
            </section>

            <section id="courses">
                <Courses courses={courses} />
            </section>

            <section id="why-us">
                <WhyChoose />
            </section>

            <Testimonials />

            <section id="contact">
                <Contact />
            </section>

            <Footer />

        </main>
    );
}

