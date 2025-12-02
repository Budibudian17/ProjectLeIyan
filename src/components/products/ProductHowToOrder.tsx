"use client";

import { MessageCircle, ClipboardList, Package, Truck } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Konsultasi Kebutuhan",
    description:
      "Hubungi tim Abufa Plywood untuk ceritakan kebutuhan proyek kamu: jenis material, ukuran, dan jumlah yang dibutuhkan.",
  },
  {
    icon: ClipboardList,
    title: "Pilih Produk & Spesifikasi",
    description:
      "Kami bantu rekomendasikan pilihan plywood, MDF, atau panel lain yang paling pas, lengkap dengan ketebalan dan grade-nya.",
  },
  {
    icon: Package,
    title: "Proses & Persiapan Barang",
    description:
      "Tim kami menyiapkan pesanan sesuai spesifikasi. Jika dibutuhkan, bisa dibantu pemotongan dasar untuk memudahkan pemasangan.",
  },
  {
    icon: Truck,
    title: "Pengiriman ke Lokasi",
    description:
      "Barang dikirim ke area Depok dan sekitarnya dengan penanganan yang rapi agar produk sampai dalam kondisi terbaik.",
  },
];

export default function ProductHowToOrder() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#942d2e]">
            HOW TO ORDER
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Dari Konsultasi hingga Pengiriman
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Ikuti langkah sederhana berikut untuk memesan material plywood, MDF, dan panel lainnya dari Abufa Plywood.
            Kami siap bantu dari tahap konsultasi sampai barang tiba di lokasi proyek kamu.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex h-full flex-col rounded-xl border border-zinc-200 bg-zinc-50/60 p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-[#942d2e] shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#942d2e]">
                    Langkah {index + 1}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-zinc-900 sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
