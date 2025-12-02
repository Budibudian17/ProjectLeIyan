"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Star } from "lucide-react";
import type { Product } from "@/lib/products/data";
import { getProducts } from "@/lib/products/api";
import type { ProductReview } from "@/lib/products/reviews";
import { getLatestReviews } from "@/lib/products/reviews";

export default function CustomerTestimonials() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const data = await getProducts();
        if (!isCancelled) {
          setProducts(data);
          setErrorMessage(null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load products for testimonials rating summary", error);
          setErrorMessage("Gagal memuat rating.");
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

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        setIsLoadingReviews(true);
        const data = await getLatestReviews({ limit: 6 });
        if (!isCancelled) {
          setReviews(data);
          setReviewsError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load latest reviews for testimonials", error);
          setReviewsError("Gagal memuat testimoni.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingReviews(false);
        }
      }
    }

    void load();

    return () => {
      isCancelled = true;
    };
  }, []);

  const { averageRating, totalReviews } = (() => {
    if (!products.length) {
      return { averageRating: 0, totalReviews: 0 };
    }

    let totalReviewCount = 0;
    let totalRatingPoints = 0;

    for (const product of products) {
      const count = product.reviewsCount ?? 0;
      const rating = product.rating ?? 0;
      totalReviewCount += count;
      totalRatingPoints += rating * count;
    }

    const avg = totalReviewCount > 0 ? totalRatingPoints / totalReviewCount : 0;
    return { averageRating: avg, totalReviews: totalReviewCount };
  })();

  const hasManyReviews = reviews.length > 3;

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#942d2e]">
              What Our Customers Say
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
              Cerita singkat dari pelanggan Abufa Plywood
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
              Beberapa testimoni dari kontraktor, pengrajin, dan pemilik usaha yang rutin memakai
              material panel dan kayu dari Abufa Plywood untuk proyek mereka.
            </p>
          </div>
          <div className="mt-2 flex flex-col items-start gap-1 text-sm text-zinc-500 sm:mt-0 sm:items-end">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[#942d2e]" />
              <span>Feedback mereka bantu kami jaga kualitas.</span>
            </div>
            <div className="mt-1 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-medium text-[#942d2e]">
              {isLoading && !errorMessage && <span>Memuat rating...</span>}
              {!isLoading && errorMessage && <span>{errorMessage}</span>}
              {!isLoading && !errorMessage && totalReviews > 0 && (
                <span>
                  Rating produk {averageRating.toFixed(1)}/5 dari {totalReviews} review
                </span>
              )}
              {!isLoading && !errorMessage && totalReviews === 0 && (
                <span>Belum ada review produk</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pb-2">
          {reviewsError && (
            <div className="mx-auto mb-4 max-w-md rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {reviewsError}
            </div>
          )}

          {isLoadingReviews ? (
            <div className="flex w-full flex-wrap justify-center gap-5 sm:gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-56 w-[260px] rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 shadow-sm animate-pulse sm:h-60 sm:w-[280px] md:h-60 md:w-[320px]"
                />
              ))}
            </div>
          ) : hasManyReviews ? (
            <div className="overflow-hidden">
              <div className="flex w-max gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden animate-vision-marquee">
                {reviews.map((item) => {
                  const initials = item.name
                    .split(" ")
                    .filter(Boolean)
                    .map((part) => part[0]?.toUpperCase())
                    .join("")
                    .slice(0, 2);

                  return (
                    <article
                      key={item.id}
                      className="flex h-56 w-[260px] shrink-0 flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-md sm:h-60 sm:w-[280px] md:h-60 md:w-[320px]"
                    >
                      <p className="text-sm leading-relaxed text-zinc-700">
                        {item.text}
                      </p>
                      <div className="mt-3 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              "h-4 w-4 " +
                              (i < item.rating
                                ? "fill-orange-400 text-orange-400"
                                : "text-zinc-300")
                            }
                          />
                        ))}
                        <span className="ml-1 text-[11px] font-medium text-zinc-500">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                      <div className="mt-5 flex items-center gap-3 border-t border-zinc-200 pt-4 text-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                          {initials || "P"}
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900">{item.name}</p>
                          <p className="text-xs uppercase tracking-wide text-zinc-500">Pelanggan</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {reviews.map((item) => {
                const initials = item.name
                  .split(" ")
                  .filter(Boolean)
                  .map((part) => part[0]?.toUpperCase())
                  .join("")
                  .slice(0, 2);

                return (
                  <article
                    key={item.id}
                    className="flex h-56 flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-md sm:h-60 md:h-60"
                  >
                    <p className="text-sm leading-relaxed text-zinc-700">
                      {item.text}
                    </p>
                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            "h-4 w-4 " +
                            (i < item.rating ? "fill-orange-400 text-orange-400" : "text-zinc-300")
                          }
                        />
                      ))}
                      <span className="ml-1 text-[11px] font-medium text-zinc-500">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center gap-3 border-t border-zinc-200 pt-4 text-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                        {initials || "P"}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">{item.name}</p>
                        <p className="text-xs uppercase tracking-wide text-zinc-500">Pelanggan</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
