"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 0,
    image: "/img/hero1.webp",
    title: "Bangun Rumah Impian dengan Bata Berkualitas",
    description:
      "Le Iyan menyediakan material bata berkualitas untuk hunian yang kokoh, rapi, dan tahan lama.",
    cta: "Lihat Koleksi Bata",
  },
  {
    id: 1,
    image: "/img/hero2.webp",
    title: "Solusi Material untuk Proyek Skala Kecil - Besar",
    description:
      "Dari renovasi rumah sampai proyek komersial, kami siap memenuhi kebutuhan material Anda.",
    cta: "Konsultasi Proyek",
  },
  {
    id: 2,
    image: "/img/hero3.webp",
    title: "Pengiriman Cepat ke Area Depok dan Sekitarnya",
    description:
      "Stok siap kirim dengan pelayanan ramah dan profesional untuk memudahkan pekerjaan tukang.",
    cta: "Hubungi Kami",
  },
];

const SLIDE_INTERVAL_MS = 3000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
      {/* Background images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            {activeSlide.title}
          </h1>
          <div className="mt-5 min-h-[96px] sm:min-h-[104px] md:min-h-[120px]">
            <p className="text-base leading-relaxed text-zinc-100 sm:text-lg md:text-xl">
              {activeSlide.description}
            </p>
          </div>
          <div className="mt-7 flex justify-center">
            <Button className="bg-orange-600 px-8 py-5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 md:text-base">
              {activeSlide.cta}
            </Button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-6 bg-orange-500" : "w-2.5 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
