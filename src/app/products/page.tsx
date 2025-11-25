"use client";

import { useEffect } from "react";
import ProductHero from "@/components/hero/ProductHero";
import KeyFeatures from "@/components/products/KeyFeatures";
import ProductGrid from "@/components/products/ProductGrid";
import ProductHowToOrder from "@/components/products/ProductHowToOrder";
import { incrementStat } from "@/lib/stats";

export default function ProductsPage() {
  useEffect(() => {
    void incrementStat("productPageViews");
  }, []);

  return (
    <div>
      <ProductHero />
      <KeyFeatures />
      <ProductGrid />
      <ProductHowToOrder />
    </div>
  );
}
