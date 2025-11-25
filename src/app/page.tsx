"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/hero";
import ProductsSection from "@/components/products/Products";
import AboutSection from "@/components/about/AboutSection";
import ProductOverview from "@/components/overview/ProductOverview";
import OurVision from "@/components/vision/OurVision";
import OurGallery from "@/components/gallery/OurGallery";
import CustomerTestimonials from "@/components/testimonials/CustomerTestimonials";
import OurClients from "@/components/clients/OurClients";
import FaqSection from "@/components/faq/FaqSection";
import { incrementStat } from "@/lib/stats";

export default function Home() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  useEffect(() => {
    void incrementStat("totalVisitors");
  }, []);

  return (
    <div>
      {isInitialLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="relative flex items-center gap-4">
              <div className="h-3 w-40 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 shadow-lg shadow-amber-900/40" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-10 w-10 text-zinc-100 drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] animate-saw-cut"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M21 7.5 13.5 0 12 1.5 9 4.5 5.25 0.75 3.75 2.25 7.5 6 3 10.5l3 3L10.5 9l3.75 3.75 1.5-1.5L12 7.5 13.5 6l4.5 4.5zM3 15v6h6v-2H7v-2H5v-2z"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500 sm:text-sm">
                Loading
              </p>
              <p className="text-sm text-zinc-200 sm:text-base">
                Gergaji lagi memotong kayu, tunggu sebentar ya...
              </p>
            </div>
          </div>
        </div>
      )}

      <Hero />
      <ProductsSection onReady={() => setIsInitialLoading(false)} />
      <AboutSection />
      <ProductOverview />
      <OurVision />
      <OurGallery />
      <CustomerTestimonials />
      <FaqSection />
      <OurClients />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10" />
    </div>
  );
}
