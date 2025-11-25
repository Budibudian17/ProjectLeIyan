"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { incrementStat } from "@/lib/stats";

export default function AboutOfferCta() {
  async function handleContactClick() {
    void incrementStat("contactClicks");
  }

  return (
    <section className="bg-zinc-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm sm:shadow-md">
          <div className="flex flex-col items-center gap-6 px-6 py-10 text-center sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between md:text-left">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600 sm:text-sm">
                Are You Interested in our Offer?
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
                Siap bantu proyek plywood dan panel Anda di Depok dan sekitarnya
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Sampaikan kebutuhan ukuran, jenis material, dan estimasi waktu pengerjaan. Tim
                Abufa Plywood akan membantu menyiapkan penawaran dan stok yang paling sesuai untuk
                proyek Anda.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 md:items-end">
              <Button
                onClick={handleContactClick}
                className="flex items-center gap-2 bg-orange-600 px-7 py-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 md:text-base"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Contact Us via WhatsApp</span>
              </Button>
              <p className="text-[11px] text-zinc-500 sm:text-xs">
                Respon cepat di jam operasional
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
