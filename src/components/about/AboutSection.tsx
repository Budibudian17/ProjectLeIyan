"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const [years, setYears] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!badgeRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const target = 10;
          const duration = 1000; // ms
          const steps = 20;
          const increment = target / steps;
          const intervalTime = duration / steps;

          let current = 0;
          const intervalId = window.setInterval(() => {
            current += increment;
            if (current >= target) {
              setYears(target);
              window.clearInterval(intervalId);
            } else {
              setYears(Math.round(current));
            }
          }, intervalTime);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(badgeRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-center">
        {/* Left: Images and experience badge */}
        <div className="relative flex flex-1 flex-col gap-4 md:gap-6">
          <div className="flex gap-4">
            <div className="relative h-40 flex-1 overflow-hidden rounded-xl bg-zinc-200 sm:h-52 md:h-60">
              <Image
                src="/img/aboutuss1.webp"
                alt="Gudang material Abufa Plywood"
                fill
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative hidden h-40 flex-1 overflow-hidden rounded-xl bg-zinc-200 sm:block sm:h-52 md:h-60">
              <Image
                src="/img/aboutuss2.webp"
                alt="Material plywood dan panel Abufa Plywood"
                fill
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              ref={badgeRef}
              className="relative flex h-20 w-20 items-center justify-center text-orange-600 sm:h-24 sm:w-24"
            >
              <div className="absolute inset-0 rounded-full bg-orange-100/60 shadow-sm" />
              <div className="absolute inset-0 animate-badge-pulse rounded-full border border-orange-200" />
              <div className="relative flex h-14 w-14 items-center justify-center">
                <span className="text-xl font-extrabold sm:text-2xl">{years}+</span>
              </div>
            </div>
            <div className="text-sm sm:text-base">
              <p className="font-semibold text-zinc-900">Tahun melayani kebutuhan material</p>
              <p className="text-zinc-600">Fokus area Depok dan sekitarnya</p>
            </div>
          </div>
        </div>

        {/* Right: Text content */}
        <div className="flex flex-1 flex-col gap-4 md:gap-5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            About Us
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Abufa Plywood, partner material kayu lembaran untuk proyek Anda
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
            Abufa Plywood adalah penyedia material kayu dan panel lembaran yang berlokasi di Depok,
            menghadirkan produk seperti plywood, MDF, block melamin, partikel board, dan phenolic
            film. Kami fokus pada kualitas, kerapihan, dan ketersediaan stok untuk mendukung
            kebutuhan tukang, kontraktor, maupun pemilik rumah.
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
            Dengan pengalaman bertahun-tahun di lapangan, kami memahami pentingnya material yang
            presisi dan mudah dikerjakan. Produk kami dipilih agar cocok untuk berbagai aplikasi:
            dari furniture custom, interior rumah, hingga kebutuhan proyek skala komersial.
          </p>
          <ul className="mt-1 space-y-1 text-sm text-zinc-700 sm:text-base">
            <li>• Pilihan ketebalan dan ukuran yang beragam</li>
            <li>• Stok siap kirim untuk area Depok dan sekitar</li>
            <li>• Konsultasi sederhana untuk bantu pilih material yang tepat</li>
          </ul>
          <div className="mt-4">
            <Button className="bg-orange-600 px-6 py-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 md:text-base">
              More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
