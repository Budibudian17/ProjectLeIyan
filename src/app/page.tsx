"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    void incrementStat("totalVisitors");
  }, []);

  return (
    <div>
      <Hero />
      <ProductsSection />
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
