"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { navigation } from "@/constants/navigation";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-slate-700 hover:text-blue-700 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/register"
          className="rounded-full bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
        >
          Enroll Now
        </Link>

      </div>
    </header>
  );
}
