"use client";

import { MessageCircle, Star } from "lucide-react";

const testimonials = [
  {
    name: "Pak Andi",
    role: "Kontraktor Depok",
    initials: "PA",
    rating: 5,
    quote:
      "Barang selalu ready dan rapi, jadi tukang di lapangan nggak perlu nunggu lama. Plywood dari Le Iyan juga presisi, enak dipotong.",
  },
  {
    name: "Bu Rina",
    role: "Pemilik workshop furniture",
    initials: "BR",
    rating: 4,
    quote:
      "Stok MDF dan block melamin lengkap, kualitas permukaannya halus. Cocok buat finishing HPL dan cat duco.",
  },
  {
    name: "Hendra",
    role: "Pengrajin interior",
    initials: "H",
    rating: 4,
    quote:
      "Harga masih masuk akal untuk kualitas proyek. Pengiriman ke area Depok juga cukup cepat dan komunikasinya enak.",
  },
];

const marqueeTestimonials = [...testimonials, ...testimonials];

export default function CustomerTestimonials() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              What Our Customers Say
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
              Cerita singkat dari pelanggan Le Iyan
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
              Beberapa testimoni dari kontraktor, pengrajin, dan pemilik usaha yang rutin memakai
              material panel dan kayu dari Le Iyan untuk proyek mereka.
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500 sm:mt-0">
            <MessageCircle className="h-4 w-4 text-orange-500" />
            <span>Feedback mereka bantu kami jaga kualitas.</span>
          </div>
        </div>

        <div className="mt-8 overflow-hidden pb-2">
          <div className="flex w-max gap-5 sm:gap-6 animate-vision-marquee">
            {marqueeTestimonials.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="flex h-56 w-[260px] shrink-0 flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-md sm:h-60  sm:w-[280px] md:h-60 md:w-[320px]"
              >
                <p className="text-sm leading-relaxed text-zinc-700">
                  {item.quote}
                </p>
                <div className="mt-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        "h-4 w-4 " +
                        (i < item.rating
                          ? "fill-orange-400 text-orange-400"
                          : "text-zinc-300")
                      }
                    />
                  ))}
                  <span className="ml-1 text-[11px] font-medium text-zinc-500">
                    {item.rating}.0
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-zinc-200 pt-4 text-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">{item.name}</p>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
