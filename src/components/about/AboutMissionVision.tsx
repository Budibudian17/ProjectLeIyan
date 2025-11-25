"use client";

import { Target, Eye } from "lucide-react";

export default function AboutMissionVision() {
  return (
    <section className="bg-zinc-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600 sm:text-sm">
            Mission & Vision
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Arah dan tujuan Abufa Plywood ke depan
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Kami tidak hanya menjual material, tetapi juga membangun kepercayaan jangka panjang
            dengan tukang, kontraktor, dan pemilik rumah melalui layanan yang konsisten dan
            kualitas produk yang terjaga.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2">
          {/* Mission */}
          <div className="flex h-full flex-col rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">Misi Kami</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
              Menjadi partner terpercaya dalam penyediaan material plywood dan panel lembaran
              dengan layanan yang ramah, responsif, dan mudah dijangkau untuk berbagai skala
              proyek, dari renovasi rumah hingga kebutuhan interior komersial.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-zinc-700 sm:text-base">
              <li>• Menjaga kualitas material yang konsisten dan rapi.</li>
              <li>• Menyediakan stok yang siap kirim untuk kebutuhan mendadak.</li>
              <li>• Memberikan informasi yang jelas agar pelanggan mudah memilih produk.</li>
            </ul>
          </div>

          {/* Vision */}
          <div className="flex h-full flex-col rounded-2xl border border-zinc-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-800">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">Visi Kami</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
              Menjadi rujukan utama penyedia material kayu lembaran di Depok dan sekitarnya,
              yang dikenal karena kemudahan akses, pelayanan yang bersahabat, dan komitmen
              terhadap kualitas setiap produk yang dikirimkan.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-zinc-700 sm:text-base">
              <li>• Tumbuh bersama pelanggan dan mitra usaha secara berkelanjutan.</li>
              <li>• Mengembangkan layanan yang lebih modern dan terintegrasi.</li>
              <li>• Menjadi nama yang diingat ketika orang membutuhkan material plywood.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
