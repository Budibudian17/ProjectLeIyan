"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, Facebook, Instagram, MessageCircle, Youtube, ChevronDown, ChevronUp } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { incrementStat } from "@/lib/stats";
import type { Product } from "@/lib/products/data";
import { getProducts, updateProduct } from "@/lib/products/api";
import { addReviewForProduct, getReviewsForProduct, type ProductReview } from "@/lib/products/reviews";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductDetailPage() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] ?? "1";
  const normalizedId = String(lastSegment).trim();
  const [productsState, setProductsState] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 0,
    text: "",
  });

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const data = await getProducts();
        if (isCancelled) return;

        setProductsState(data);

        const found = data.find((p) => String(p.id) === normalizedId) ?? null;
        setProduct(found);

        if (!found) {
          setErrorMessage("Produk tidak ditemukan. Mungkin sudah dihapus atau URL tidak valid.");
        } else {
          setErrorMessage(null);
          try {
            setIsLoadingReviews(true);
            const loadedReviews = await getReviewsForProduct(found.id);
            if (!isCancelled) {
              setReviews(loadedReviews);
            }
          } catch (error) {
            if (!isCancelled) {
              console.error("Failed to load product reviews from Firestore", error);
            }
          } finally {
            if (!isCancelled) {
              setIsLoadingReviews(false);
            }
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load product detail from Firestore", error);
          setErrorMessage("Gagal memuat detail produk dari server.");
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
  }, [normalizedId]);

  const effectiveProduct: Product | null = product;

  const detail = effectiveProduct
    ? {
        heading: effectiveProduct.name,
        description: [
          effectiveProduct.description ||
            "Deskripsi produk belum tersedia secara detail. Silakan hubungi tim Abufa Plywood untuk informasi lebih lanjut.",
        ],
        specs: [
          effectiveProduct.size && effectiveProduct.size !== "-"
            ? { label: "Ukuran", value: effectiveProduct.size }
            : null,
          effectiveProduct.thickness && effectiveProduct.thickness !== "-"
            ? { label: "Ketebalan", value: effectiveProduct.thickness }
            : null,
          effectiveProduct.category
            ? { label: "Kategori", value: effectiveProduct.category }
            : null,
        ].filter(Boolean) as { label: string; value: string }[],
      }
    : {
        heading: "Produk tidak ditemukan",
        description: [
          "Produk yang Anda cari tidak tersedia. Silakan kembali ke halaman produk untuk melihat pilihan lainnya.",
        ],
        specs: [],
      };

  const stars = Array.from({ length: 5 });

  const reviewsForProduct: ProductReview[] = reviews;

  const relatedProducts = productsState
    .filter((p) => effectiveProduct && p.id !== effectiveProduct.id)
    .slice(0, 3);

  async function handleContactClick() {
    void incrementStat("contactClicks");
  }

  return (
    <main className="bg-zinc-50 py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs font-medium text-zinc-500 sm:text-sm">
          <Link href="/" className="hover:text-orange-600">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/products" className="hover:text-orange-600">
            Products
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-orange-600">
            {isLoading ? "Memuat..." : effectiveProduct?.name ?? "Produk tidak ditemukan"}
          </span>
        </nav>

        {errorMessage && !isLoading && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <section className="grid gap-10 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 md:grid-cols-2 md:p-9">
          {/* Left: image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <div className="relative aspect-[4/3] w-full">
                {effectiveProduct ? (
                  <Image
                    src={effectiveProduct.image}
                    alt={effectiveProduct.name}
                    fill
                    sizes="(min-width: 1024px) 28rem, (min-width: 768px) 22rem, 100vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                    Gambar produk tidak tersedia
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: info */}
          <div className="flex flex-col justify-center gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600 sm:text-sm">
                {effectiveProduct?.category ?? "Product"}
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
                {isLoading
                  ? "Memuat produk..."
                  : effectiveProduct?.name ?? "Produk tidak ditemukan"}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 sm:text-sm">
              <div className="flex items-center gap-1">
                {stars.map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.round(effectiveProduct?.rating ?? 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-1 text-xs text-zinc-500">
                {effectiveProduct?.reviewsCount && effectiveProduct.reviewsCount > 0
                  ? `${effectiveProduct.reviewsCount} ulasan`
                  : "Belum ada ulasan"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-700">
              <span className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium sm:text-sm">
                Ukuran: {effectiveProduct?.size ?? "-"}
              </span>
              <span className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium sm:text-sm">
                {effectiveProduct?.thickness ?? "-"}
              </span>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Perkiraan harga mulai dari</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-orange-600 sm:text-4xl">
                {effectiveProduct ? formatPrice(effectiveProduct.price) : "-"}
              </p>
            </div>

            <div>
              <Button
                onClick={handleContactClick}
                className="flex items-center gap-2 bg-orange-600 px-7 py-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Contact Us</span>
              </Button>
            </div>

            <div className="mt-1">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Share
              </p>
              <div className="mt-3 flex items-center gap-3 text-zinc-700">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors duration-200 hover:border-orange-500 hover:text-orange-600"
                  aria-label="Share to Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors duration-200 hover:border-orange-500 hover:text-orange-600"
                  aria-label="Share to Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors duration-200 hover:border-orange-500 hover:text-orange-600"
                  aria-label="Share to WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors duration-200 hover:border-orange-500 hover:text-orange-600"
                  aria-label="Share to YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Description & Characteristics */}
        <section className="mt-10 grid gap-10 border-t border-zinc-200 pt-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          {/* Deskripsi */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
              Deskripsi
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
              {detail.heading}
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
              {detail.description.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          {/* Spesifikasi & Karakteristik */}
          <div className="space-y-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
                Spesifikasi Utama
              </p>
              <dl className="mt-3 space-y-2 text-sm text-zinc-700 sm:text-base">
                {detail.specs.map((spec) => (
                  <div key={spec.label} className="flex gap-2">
                    <dt className="w-32 shrink-0 text-zinc-500">{spec.label}</dt>
                    <dd className="flex-1 font-medium text-zinc-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </section>

        {/* Reviews & Write Review */}
        <section className="mt-12 border-t border-zinc-200 pt-10">
          <div className="flex flex-col gap-10 md:flex-row">
            {/* Existing reviews */}
            <div className="md:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
                Reviews
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                Apa kata pelanggan tentang produk ini
              </h2>

              <div className="mt-4 flex items-center gap-3 text-sm text-zinc-700">
                <div className="flex items-center gap-1 text-orange-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < Math.round(effectiveProduct?.rating ?? 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-zinc-900">
                  {effectiveProduct ? `${effectiveProduct.rating.toFixed(1)} dari 5` : "-"}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <ChevronUp className="h-3 w-3" />
                  <ChevronDown className="h-3 w-3" />
                </div>
                <p>Scroll ke atas / bawah untuk melihat ulasan lainnya</p>
              </div>

              <div className="mt-2 max-h-80 space-y-4 overflow-y-auto pr-1 sm:max-h-96">
                {isLoadingReviews ? (
                  <p className="text-xs text-zinc-500">Memuat ulasan...</p>
                ) : reviewsForProduct.length === 0 ? (
                  <p className="text-xs text-zinc-500">
                    Belum ada ulasan yang tersimpan. Jadilah yang pertama menulis ulasan.
                  </p>
                ) : (
                  reviewsForProduct.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">{review.name}</p>
                          {review.createdAt && (
                            <p className="text-xs text-zinc-500">
                              {review.createdAt.toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-0.5 text-yellow-400">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-3.5 w-3.5 ${
                                index < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-zinc-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-700">{review.text}</p>
                    </article>
                  ))
                )}
              </div>
            </div>

            {/* Write a review form */}
            <div className="md:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
                Tulis Ulasan
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                Bagikan pengalaman kamu memakai produk ini
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Form ini masih bersifat simulasi. Nantinya bisa dihubungkan ke sistem autentikasi dan database
                untuk menyimpan ulasan pelanggan secara langsung.
              </p>

              <form
                className="mt-5 space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
                onSubmit={async (event: FormEvent<HTMLFormElement>) => {
                  event.preventDefault();

                  if (!effectiveProduct) {
                    setReviewError("Produk tidak valid untuk diberi ulasan.");
                    return;
                  }

                  if (!reviewForm.name.trim()) {
                    setReviewError("Nama tidak boleh kosong.");
                    return;
                  }

                  if (!reviewForm.text.trim()) {
                    setReviewError("Ulasan tidak boleh kosong.");
                    return;
                  }

                  if (reviewForm.rating < 1 || reviewForm.rating > 5) {
                    setReviewError("Pilih rating antara 1 sampai 5 bintang.");
                    return;
                  }

                  try {
                    setReviewError(null);
                    setIsSubmittingReview(true);

                    const newReview = await addReviewForProduct({
                      productId: effectiveProduct.id,
                      name: reviewForm.name.trim(),
                      rating: reviewForm.rating,
                      text: reviewForm.text.trim(),
                    });

                    setReviews((prev) => [newReview, ...prev]);

                    const currentRating = effectiveProduct.rating ?? 0;
                    const currentCount = effectiveProduct.reviewsCount ?? 0;
                    const newCount = currentCount + 1;
                    const newRating =
                      (currentRating * currentCount + reviewForm.rating) / newCount;

                    await updateProduct(effectiveProduct.id, {
                      rating: newRating,
                      reviewsCount: newCount,
                    });

                    setProduct({
                      ...effectiveProduct,
                      rating: newRating,
                      reviewsCount: newCount,
                    });

                    setReviewForm({ name: "", rating: 0, text: "" });
                  } catch (error) {
                    console.error("Failed to submit product review", error);
                    setReviewError("Gagal mengirim ulasan. Silakan coba lagi.");
                  } finally {
                    setIsSubmittingReview(false);
                  }
                }}
              >
                <div className="space-y-1">
                  <label className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Nama
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    placeholder="Masukkan nama kamu"
                    value={reviewForm.name}
                    onChange={(event) =>
                      setReviewForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const value = index + 1;
                      const isActive = value <= reviewForm.rating;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setReviewForm((prev) => ({ ...prev, rating: value }))
                          }
                          className={`flex h-8 w-8 items-center justify-center rounded-full border text-zinc-500 transition-colors ${
                            isActive
                              ? "border-orange-500 text-orange-500"
                              : "border-zinc-300 hover:border-orange-500 hover:text-orange-500"
                          }`}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              isActive
                                ? "fill-orange-500 text-orange-500"
                                : "text-zinc-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Ulasan
                  </label>
                  <textarea
                    rows={4}
                    className="w-full resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    placeholder="Ceritakan pengalaman kamu menggunakan produk ini..."
                    value={reviewForm.text}
                    onChange={(event) =>
                      setReviewForm((prev) => ({ ...prev, text: event.target.value }))
                    }
                  />
                </div>

                {reviewError && (
                  <p className="text-xs text-red-600">{reviewError}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="mt-1 bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmittingReview ? "Mengirim..." : "Kirim Ulasan"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-12 border-t border-zinc-200 pt-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
                Related Products
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                Produk lain yang mungkin kamu butuhkan
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden text-sm font-semibold text-orange-600 underline-offset-4 hover:underline sm:inline-flex"
            >
              Lihat semua produk
            </Link>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {relatedProducts.map((item) => (
              <article
                key={item.id}
                className="group relative h-64 overflow-hidden rounded-xl bg-zinc-900 text-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 768px) 12rem, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/25" />
                </div>

                {/* Content overlay */}
                <div className="relative z-10 flex h-full flex-col justify-between p-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">
                      {item.category}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug sm:text-base">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-100/90">Mulai dari {formatPrice(item.price)}</p>
                  </div>

                  <div className="mt-3 flex items-end justify-between text-xs text-zinc-100">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-0.5 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-3.5 w-3.5 ${
                              index < Math.round(item.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-zinc-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/products/${item.id}`}
                      className="inline-flex items-center rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-semibold text-zinc-900 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
