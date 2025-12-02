"use client";

import Image from "next/image";

export default function AboutHowWeWork() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#942d2e] sm:text-sm">
            How We Work
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Cara kerja kami dalam melayani kebutuhan material Anda
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            Setiap pesanan di Abufa Plywood dikerjakan dengan alur yang rapi: mulai dari pemilihan
            material, proses pemotongan, hingga pengecekan akhir sebelum barang dikirim ke lokasi
            Anda.
          </p>
        </div>

        {/* Rows */}
        <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
          {/* Row 1: Text left, image right */}
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
            <div className="order-1 md:order-0">
              <h3 className="text-lg font-semibold text-[#942d2e] sm:text-xl">
                Konsultasi kebutuhan & pemilihan material
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Kami membantu Anda memilih jenis plywood, MDF, atau panel lain yang paling sesuai
                dengan kebutuhan proyek: mulai dari ketebalan, ukuran, hingga karakter permukaan.
                Tujuannya, Anda tidak perlu bingung dan bisa langsung fokus ke pengerjaan.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Tim kami juga dapat memberi gambaran kasar estimasi jumlah lembar yang diperlukan
                berdasarkan ukuran ruangan atau desain yang Anda miliki.
              </p>
            </div>

            <div className="order-2 md:order-0">
              <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-zinc-200 sm:h-64 md:h-72">
                <Image
                  src="/img/plywood1.webp"
                  alt="Tumpukan plywood siap dipilih sesuai kebutuhan"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Image left, text right */}
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
            <div className="order-1">
              <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-zinc-200 sm:h-64 md:h-72">
                <Image
                  src="/img/doc3.webp"
                  alt="Proses pengecekan dan persiapan pengiriman material Abufa Plywood"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="order-2">
              <h3 className="text-lg font-semibold text-[#942d2e] sm:text-xl">
                Pemotongan, pengecekan, dan pengiriman
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Setelah material dipilih, lembaran akan dipotong sesuai kebutuhan (jika diperlukan)
                dan dicek kembali kondisi tepi, permukaan, serta ketebalannya sebelum dikemas.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Kami berusaha memastikan barang tiba dalam kondisi rapi dan siap dikerjakan, agar
                tukang di lapangan bisa langsung memulai tanpa perlu banyak perapihan ulang.
              </p>
            </div>
          </div>

          {/* Row 3: Text left, image right */}
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
            <div className="order-1 md:order-0">
              <h3 className="text-lg font-semibold text-[#942d2e] sm:text-xl">
                Penjadwalan dan koordinasi pengiriman
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Setelah detail pesanan disepakati, kami mengatur jadwal pengiriman yang paling
                memungkinkan dengan mempertimbangkan akses lokasi dan kebutuhan waktu pengerjaan
                di lapangan.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Tujuannya, material tiba di waktu yang tepat sehingga proses pemasangan dapat
                berjalan tanpa banyak penundaan.
              </p>
            </div>

            <div className="order-2 md:order-0">
              <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-zinc-200 sm:h-64 md:h-72">
                <Image
                  src="/img/doc4.webp"
                  alt="Koordinasi dan persiapan jadwal pengiriman material"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Image left, text right */}
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
            <div className="order-1">
              <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-zinc-200 sm:h-64 md:h-72">
                <Image
                  src="/img/doc5.webp"
                  alt="Material plywood yang sudah tiba dan siap dipasang di lokasi proyek"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="order-2">
              <h3 className="text-lg font-semibold text-[#942d2e] sm:text-xl">
                Follow up dan kesiapan untuk kebutuhan berikutnya
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Setelah barang diterima, kami tetap terbuka untuk dihubungi jika ada kebutuhan
                tambahan, penyesuaian jumlah material, atau proyek lanjutan yang ingin segera
                dikerjakan.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Dengan begitu, Abufa Plywood dapat menjadi partner jangka panjang, bukan hanya
                sekali kirim lalu selesai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
