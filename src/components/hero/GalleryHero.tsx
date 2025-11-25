"use client";

import Link from "next/link";
import { Home } from "lucide-react";

const hero = {
  image: "/img/doc5.webp",
  title: "Galeri Proyek dan Material",
  description:
    "Lihat dokumentasi proyek, stok material, dan suasana kerja Abufa Plywood sebagai referensi sebelum memulai pekerjaan Anda.",
};

export default function GalleryHero() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.image})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-4">
        <div className="mx-auto w-full max-w-3xl text-center">
          {/* Breadcrumb */}
          <div className="mb-4 flex justify-center">
            <nav className="flex items-center text-sm text-zinc-300">
              <Link href="/" className="flex items-center hover:text-orange-400">
                <Home className="mr-1 h-4 w-4" />
                <span>Beranda</span>
              </Link>
              <span className="mx-2">/</span>
              <span className="text-orange-400">Gallery</span>
            </nav>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
          <div className="mt-4">
            <p className="text-lg leading-relaxed text-zinc-200 sm:text-xl">
              {hero.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
