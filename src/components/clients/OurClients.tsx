"use client";

import Image from "next/image";

const clients = [
  { name: "Mitra10", logo: "/img/mitra10.webp" },
  { name: "Depo Bangunan", logo: "/img/depobangunan.webp" },
  { name: "ACE Hardware Indonesia", logo: "/img/acehardware.webp" },
  { name: "Ciputra Group", logo: "/img/ciputragroup1.webp" },
  { name: "Summarecon", logo: "/img/summarecongroup.webp" },
  { name: "Adhi Karya", logo: "/img/adhikarya.webp" },
  { name: "Wijaya Karya", logo: "/img/wijayakarya.webp" },
  { name: "Dekoruma", logo: "/img/dekoruma1.webp" },
];

const marqueeClients = [...clients, ...clients];

export default function OurClients() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            Our Valuable Clients
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Dipercaya berbagai brand di dunia bangunan
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
            Deretan brand dan perusahaan yang menjadi referensi klien kami di sektor material,
            konstruksi, dan interior. Logo berikut digunakan sebagai ilustrasi untuk menunjukkan
            kedekatan Le Iyan dengan dunia proyek di Indonesia.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50/60 px-4 py-5 shadow-sm sm:px-6 sm:py-6">
          <div className="flex w-max items-center gap-6 animate-vision-marquee">
            {marqueeClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex items-center justify-center px-4 py-2"
              >
                <div className="relative h-10 w-28 sm:h-12 sm:w-32 md:h-12 md:w-32">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
