"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { useState } from "react";

export default function Navbar() {

    const [open, setOpen] = useState(false);

    return (

        <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur shadow-sm">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                <Logo />

                <nav className="hidden items-center gap-8 lg:flex">

                    <Link href="/" className="font-medium hover:text-brand-primary">
                        Home
                    </Link>

                    <Link href="#about" className="font-medium hover:text-brand-primary">
                        About
                    </Link>

                    <Link href="#courses" className="font-medium hover:text-brand-primary">
                        Courses
                    </Link>

                    <Link href="#contact" className="font-medium hover:text-brand-primary">
                        Contact
                    </Link>

                    <Link
                        href="/auth/login"
                        className="rounded-lg border px-4 py-2 hover:bg-slate-50"
                    >
                        Student Login
                    </Link>

                    <Link
                        href="/tutor/login"
                        className="rounded-lg border px-4 py-2 hover:bg-slate-50"
                    >
                        Tutor Login
                    </Link>

                    <Link
                        href="/admin/login"
                        className="rounded-lg border px-4 py-2 hover:bg-slate-50"
                    >
                        Admin
                    </Link>

                    <Link
                        href="/auth/register"
                        className="rounded-full bg-brand-primary px-6 py-3 font-semibold text-white hover:opacity-90"
                    >
                        Enrol Now
                    </Link>

                </nav>

                <button
                    className="text-3xl lg:hidden"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

            </div>

            {open && (

                <div className="border-t bg-white lg:hidden">

                    <div className="flex flex-col p-5">

                        <Link href="/" className="py-3" onClick={() => setOpen(false)}>
                            Home
                        </Link>

                        <Link href="#about" className="py-3" onClick={() => setOpen(false)}>
                            About
                        </Link>

                        <Link href="#courses" className="py-3" onClick={() => setOpen(false)}>
                            Courses
                        </Link>

                        <Link href="#contact" className="py-3" onClick={() => setOpen(false)}>
                            Contact
                        </Link>

                        <hr className="my-3" />

                        <Link href="/auth/login" className="py-3">
                            Student Login
                        </Link>

                        <Link href="/tutor/login" className="py-3">
                            Tutor Login
                        </Link>

                        <Link href="/admin/login" className="py-3">
                            Admin Login
                        </Link>

                        <Link
                            href="/auth/register"
                            className="mt-4 rounded-full bg-brand-primary px-5 py-3 text-center font-semibold text-white"
                        >
                            Enrol Now
                        </Link>

                    </div>

                </div>

            )}

        </header>

    );

}
