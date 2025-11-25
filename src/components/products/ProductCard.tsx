"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number; // 0 - 5
  description: string;
  image: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductCard({
  id,
  name,
  category,
  price,
  rating,
  description,
  image,
}: ProductCardProps) {
  const stars = Array.from({ length: 5 });

  return (
    <article className="group relative h-80 overflow-hidden rounded-xl bg-zinc-900 text-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={name}
          fill
          priority={false}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/25" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            {category}
          </p>
          <h3 className="text-lg font-semibold leading-snug md:text-xl">
            {name}
          </h3>
          <p className="mt-1 line-clamp-3 text-xs text-zinc-200/90 md:text-sm">
            {description}
          </p>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-300">
              Mulai dari
            </p>
            <p className="text-lg font-semibold md:text-xl">
              {formatPrice(price)}
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-zinc-100">
              {stars.map((_, index) => (
                <Star
                  key={index}
                  className={`h-3.5 w-3.5 ${
                    index < Math.round(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-zinc-400"
                  }`}
                />
              ))}
              <span className="ml-1 text-[11px] text-zinc-200">
                {rating.toFixed(1)} / 5
              </span>
            </div>
          </div>

          <Link
            href={`/products/${id}`}
            className="inline-flex items-center rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md"
          >
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}
