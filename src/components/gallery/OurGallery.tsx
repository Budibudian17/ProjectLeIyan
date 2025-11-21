"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const galleryImages = [
  "/img/doc1.webp",
  "/img/doc2.webp",
  "/img/doc3.webp",
  "/img/doc4.webp",
  "/img/doc5.webp",
  "/img/doc6.webp",
  "/img/doc7.webp",
  "/img/doc8.webp",
];

export default function OurGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="bg-zinc-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              Our Gallery
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
              Dokumentasi proyek dan material Le Iyan
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
              Beberapa cuplikan dokumentasi dari gudang, material, dan proyek yang menggunakan
              produk panel dan kayu dari Le Iyan.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((src, index) => (
            <div
              key={src}
              className="group relative h-40 cursor-pointer overflow-hidden rounded-xl bg-zinc-200 sm:h-44 md:h-48"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Dokumentasi Le Iyan ${index + 1}`}
                fill
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/gallery">
            <Button className="bg-orange-600 px-6 py-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 md:text-base">
              View Gallery
            </Button>
          </Link>
        </div>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-black/80"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
            <div className="relative h-[80vh] w-full overflow-hidden rounded-2xl bg-black">
              <Image
                src={selectedImage}
                alt="Preview dokumentasi Le Iyan"
                fill
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
