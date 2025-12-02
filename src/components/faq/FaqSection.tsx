"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Apa saja material utama yang dijual Abufa Plywood?",
    answer:
      "Abufa Plywood fokus pada material panel seperti plywood, MDF, block melamin, partikel board, dan phenolic film yang cocok untuk furniture, interior rumah, hingga kebutuhan proyek komersial.",
  },
  {
    id: 2,
    question: "Apakah bisa order dalam jumlah besar untuk proyek?",
    answer:
      "Bisa. Kami melayani pembelian dalam jumlah lembar maupun partai untuk kebutuhan kontraktor, workshop furniture, dan proyek interior. Silakan hubungi kami untuk cek ketersediaan stok dan penawaran harga.",
  },
  {
    id: 3,
    question: "Area mana saja yang bisa dikirim oleh Abufa Plywood?",
    answer:
      "Saat ini kami fokus melayani pengiriman ke area Depok dan sekitarnya. Untuk pengiriman di luar area tersebut, bisa didiskusikan terlebih dahulu dengan tim kami.",
  },
  {
    id: 4,
    question: "Apakah ukuran dan ketebalan plywood bisa disesuaikan?",
    answer:
      "Kami menyediakan beberapa pilihan ketebalan dan spesifikasi plywood. Ukuran standar adalah 1220 x 2440 mm dengan variasi ketebalan tertentu. Untuk kebutuhan spesial, Anda bisa konsultasi dengan tim kami.",
  },
  {
    id: 5,
    question: "Bagaimana cara memastikan kualitas material yang saya beli?",
    answer:
      "Setiap material yang kami kirim sudah melalui pengecekan visual sederhana, seperti kelurusan, permukaan, dan kondisi tepi. Jika ada kendala pada barang yang diterima, segera hubungi kami untuk dibantu solusinya.",
  },
  {
    id: 6,
    question: "Apakah Abufa Plywood menerima konsultasi pemilihan material?",
    answer:
      "Ya, kami bisa bantu rekomendasikan jenis panel yang cocok untuk kebutuhan Anda, misalnya untuk kitchen set, interior rumah, atau rak display toko.",
  },
];

export default function FaqSection() {
  const [activeId, setActiveId] = useState<number>(faqs[0]?.id ?? 1);

  const activeFaq = faqs.find((f) => f.id === activeId) ?? faqs[0];

  return (
    <section className="bg-zinc-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#942d2e]">
            Frequently Asked Questions
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Pertanyaan yang sering ditanyakan pelanggan
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
            Temukan jawaban seputar jenis material, pemakaian untuk proyek, hingga pengiriman ke area Depok
            dan sekitarnya. Jika masih ada yang kurang jelas, tim Abufa Plywood siap membantu Anda.
          </p>
        </div>

        {/* Desktop / tablet: dua kolom */}
        <div className="mt-8 hidden gap-6 md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          {/* Left: list of questions */}
          <div className="space-y-3">
            {faqs.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`flex w-full items-center justify-between rounded-full border px-4 py-3 text-left text-sm font-medium transition-all duration-200 sm:px-5 sm:py-3.5 md:text-base ${
                    isActive
                      ? "border-[#942d2e] bg-orange-50 text-[#942d2e] shadow-sm"
                      : "border-zinc-200 bg-white text-zinc-800 hover:border-orange-200 hover:bg-orange-50/40"
                  }`}
                >
                  <span className="truncate pr-4">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isActive ? "rotate-180 text-[#942d2e]" : "text-zinc-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: active answer */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-7">
            <p className="text-sm font-semibold text-[#942d2e]">{activeFaq.question}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
              {activeFaq.answer}
            </p>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="mt-8 space-y-2 md:hidden">
          {faqs.map((item) => {
            const isActive = item.id === activeId;
            return (
              <div key={item.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <button
                  type="button"
                  onClick={() => setActiveId(item.id === activeId ? -1 : item.id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-zinc-900"
                >
                  <span className="pr-3">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isActive ? "rotate-180 text-orange-500" : "text-zinc-400"
                    }`}
                  />
                </button>
                {isActive && (
                  <div className="border-t border-zinc-200 px-4 pb-4 pt-2 text-xs leading-relaxed text-zinc-700">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
