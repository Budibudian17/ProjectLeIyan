"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products/data";
import { getProducts } from "@/lib/products/api";

export default function ProductGrid() {
  const [items, setItems] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pageSize = 6;
  const totalPages = Math.ceil(items.length / pageSize) || 1;

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
          console.error("Failed to load products for ProductGrid", error);
          setErrorMessage("Gagal memuat data produk. Silakan coba beberapa saat lagi.");
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

  const startIndex = (currentPage - 1) * pageSize;
  const visibleProducts = items.slice(startIndex, startIndex + pageSize);

  return (
    <section className="bg-zinc-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            PRODUCT CATALOG
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Pilihan Material untuk Proyek Anda
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Jelajahi beberapa produk utama Abufa Plywood yang sering digunakan untuk furniture custom,
            interior rumah, hingga proyek komersial. Semua ditampilkan secara ringkas agar mudah kamu bandingkan.
          </p>
        </div>

        {errorMessage && (
          <div className="mx-auto mb-4 max-w-md rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100"
                />
              ))
            : visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  rating={product.rating}
                  description={product.description}
                  image={product.image}
                />
              ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-orange-500 hover:text-orange-600"
                  }`}
                  aria-label={`Halaman ${page}`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
