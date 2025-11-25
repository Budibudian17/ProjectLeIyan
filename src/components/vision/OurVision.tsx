"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const visionItems = [
  {
    title: "Ruang Kerja Lebih Rapi",
    description:
      "Material panel yang presisi membantu menciptakan rak dan meja kerja yang kuat namun tetap bersih dipandang.",
    image: "/img/plywood1.webp",
  },
  {
    title: "Interior Rumah Nyaman",
    description:
      "Plywood dan MDF berkualitas menghadirkan kitchen set dan furniture yang tahan lama untuk aktivitas sehari-hari.",
    image: "/img/partikelBoard1.webp",
  },
  {
    title: "Toko dan Workshop Tertata",
    description:
      "Rak display dari material yang tepat membuat produk tertata rapi dan mudah dijangkau pelanggan.",
    image: "/img/blockMelamin.webp",
  },
  {
    title: "Proyek Komersial Modern",
    description:
      "Panel lembaran serbaguna yang mendukung desain interior kafe, kantor, dan ruang publik yang estetik.",
    image: "/img/phenolicFilm.webp",
  },
];

const marqueeVisionItems = [...visionItems, ...visionItems];

export default function OurVision() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            Our Vision
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Menginspirasi proyek yang rapi dan fungsional
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
            Kami membayangkan setiap lembar plywood, MDF, dan panel lainnya di Abufa Plywood menjadi bagian
            dari ruang yang lebih tertata, nyaman, dan memudahkan pekerjaan sehari-hari, baik untuk tukang
            maupun pemilik rumah.
          </p>
        </div>
        <div className="md:text-right">
          <Button className="bg-orange-600 px-6 py-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 md:text-base">
            View Inspirations
          </Button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden pb-4">
        <div className="flex w-max gap-5 sm:gap-7 animate-vision-marquee">
          {marqueeVisionItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="group relative flex h-72 w-[260px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-3xl bg-zinc-900 sm:h-80 sm:w-[280px] md:h-88 md:w-[320px]"
            >
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/5" />
              </div>
              <div className="relative mt-auto flex flex-col gap-2 p-5 text-left text-white">
                <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                  {item.title}
                </h3>
                <p className="line-clamp-3 text-xs leading-relaxed text-zinc-100/90 sm:text-sm">
                  {item.description}
                </p>
                <span className="mt-2 inline-flex text-[11px] font-semibold uppercase tracking-wide text-orange-300 border-b-2 border-transparent pb-px transition-colors duration-200 group-hover:text-orange-400 group-hover:border-orange-400">
                  View More
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
