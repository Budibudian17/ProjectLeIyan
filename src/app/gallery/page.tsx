"use client";

import { useCallback, useEffect, useState } from "react";
import GalleryHero from "@/components/hero/GalleryHero";
import OurGallery from "@/components/gallery/OurGallery";
import { incrementStat } from "@/lib/stats";

export default function GalleryPage() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const handleGalleryReady = useCallback(() => {
    setIsInitialLoading(false);
  }, []);

  useEffect(() => {
    void incrementStat("galleryPageViews");
  }, []);

  return (
    <main className="bg-zinc-50">
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

      <GalleryHero />
      <OurGallery onReady={handleGalleryReady} />
    </main>
  );
}
