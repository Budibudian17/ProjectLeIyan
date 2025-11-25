"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products/data";
import { getProducts } from "@/lib/products/api";

export default function ProductsSection() {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const data = await getProducts();
        if (!isCancelled) {
          setItems(data);
          setErrorMessage(null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load products for ProductsSection", error);
          setErrorMessage("Gagal memuat produk.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      isCancelled = true;
    };
  }, []);

  const hasManyProducts = items.length > 4;
  const visibleProducts = hasManyProducts ? items : items.slice(0, 4);

  return (
    <section className="bg-zinc-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            Our Products
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Pilihan plywood dan panel lembaran untuk proyek Anda
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Abufa Plywood menyediakan pilihan plywood, MDF, block melamin, partikel board, dan phenolic film
            yang dirancang untuk kekuatan, keawetan, dan hasil akhir yang rapi. Cocok untuk furniture custom,
            interior rumah, hingga proyek komersial di area Depok dan sekitarnya.
          </p>
          <div className="mt-6">
            <Button className="bg-orange-600 px-6 py-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 md:text-base">
              View All Products
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden pb-4">
        {errorMessage && (
          <div className="mx-auto mb-4 max-w-md rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div
          className={
            hasManyProducts
              ? "flex w-max gap-5 sm:gap-7 animate-products-marquee"
              : "flex w-full flex-wrap justify-center gap-5 sm:gap-7"
          }
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 w-[260px] animate-pulse rounded-xl border border-zinc-200 bg-zinc-100 sm:w-[280px] md:w-[320px]"
                />
              ))
            : visibleProducts.map((product, index) => (
                <article
                  key={`${product.id}-${index}`}
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
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-5 inline-flex text-sm font-semibold text-orange-600 border-b-2 border-transparent pb-[2px] transition-colors duration-200 hover:text-orange-700 hover:border-orange-600"
                  >
                    View Product
                  </Link>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}

