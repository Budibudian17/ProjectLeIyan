"use client";

import { useEffect } from "react";
import GalleryHero from "@/components/hero/GalleryHero";
import OurGallery from "@/components/gallery/OurGallery";
import { incrementStat } from "@/lib/stats";

export default function GalleryPage() {
  useEffect(() => {
    void incrementStat("galleryPageViews");
  }, []);

  return (
    <main className="bg-zinc-50">
      <GalleryHero />
      <OurGallery />
    </main>
  );
}
