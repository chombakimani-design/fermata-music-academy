import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/images/fermata-logo.png"
        alt="Fermata Music Academy"
        width={70}
        height={70}
        priority
      />

      <div>
        <h1 className="text-3xl font-bold text-[#0B3C88]">
          Fermata
        </h1>

        <p className="text-sm uppercase tracking-[0.35em] text-amber-600">
          Music Academy
        </p>
      </div>
    </Link>
  );
}
