"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "Plywood Premium",
    description: "Plywood berkualitas untuk kebutuhan furniture dan konstruksi interior.",
    image: "/img/plywood.webp",
  },
  {
    name: "MDF Board",
    description: "MDF halus dan rata, cocok untuk finishing cat dan pelapis dekoratif.",
    image: "/img/MDF.webp",
  },
  {
    name: "Block Melamin",
    description: "Block melamin praktis untuk rak, meja, dan kebutuhan interior lainnya.",
    image: "/img/blockMelamin.webp",
  },
  {
    name: "Partikel Board",
    description: "Partikel board ekonomis untuk berbagai kebutuhan panel dan pelapis.",
    image: "/img/partikelBoard1.webp",
  },
  {
    name: "Partikel Board Plus",
    description: "Varian partikel board dengan kepadatan lebih baik dan permukaan rapi.",
    image: "/img/partikelBoard2.webp",
  },
  {
    name: "Phenolic Film",
    description: "Papan berlapis phenolic film yang tahan lembap untuk kebutuhan khusus.",
    image: "/img/phenolicFilm.webp",
  },
  {
    name: "Phenolic Film Heavy Duty",
    description: "Phenolic film dengan ketahanan lebih tinggi untuk pemakaian intensif.",
    image: "/img/phenolicFilm1.webp",
  },
];

const marqueeProducts = [...products, ...products];

export default function ProductsSection() {

  return (
    <section className="bg-zinc-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            Our Products
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Material bata dan blok untuk kebutuhan proyek Anda
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Le Iyan menyediakan pilihan bata, batako, dan material pendukung yang dirancang untuk
            kekuatan, keawetan, dan hasil akhir yang rapi. Cocok untuk pembangunan rumah tinggal,
            ruko, hingga proyek komersial di area Depok dan sekitarnya.
          </p>
          <div className="mt-6">
            <Button className="bg-orange-600 px-6 py-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 md:text-base">
              View All Products
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden pb-4">
        <div className="flex w-max gap-5 sm:gap-7 animate-products-marquee">
          {marqueeProducts.map((product, index) => (
            <article
              key={`${product.name}-${index}`}
              className="group flex w-[260px] shrink-0 flex-col justify-between rounded-xl border border-zinc-200 bg-white px-6 pb-7 pt-6 text-center shadow-sm transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md sm:w-[280px] md:w-[320px]"
            >
              <div>
                <div className="mx-auto h-36 w-full max-w-[220px] overflow-hidden rounded-md bg-zinc-100 sm:h-40 md:h-44">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={260}
                    height={176}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                  <h3 className="mt-6 text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-600 sm:text-sm">
                    {product.description}
                  </p>
                </div>
                <button className="mt-5 inline-flex text-sm font-semibold text-orange-600 border-b-2 border-transparent pb-[2px] transition-colors duration-200 hover:text-orange-700 hover:border-orange-600">
                  View Product
                </button>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}

