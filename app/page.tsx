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

    const {
        data: { user }
    } = await supabase.auth.getUser();

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

            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>

            <section id="about">
                <About />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>

            <section id="courses">
                <Courses courses={courses} user={user} />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>

            <section id="why-us">
                <WhyChoose />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>

            <Testimonials />

            <section id="contact">
                <Contact />
            </section>

            <Footer />

        </main>
    );
}




