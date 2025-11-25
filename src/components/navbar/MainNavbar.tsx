"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { incrementStat } from "@/lib/stats";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
];

export default function MainNavbar() {
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  async function handleContactClick() {
    void incrementStat("contactClicks");

    if (typeof window !== "undefined") {
      const phone = "6285353715617";
      const text =
        "Halo, saya tertarik dengan produk Abufa Plywood dan ingin berkonsultasi / memesan.";
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

      window.open(url, "_blank");
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setIsFixed(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClasses = isFixed
    ? "fixed left-0 right-0 top-0 z-40 w-full bg-white shadow-sm"
    : "w-full bg-white shadow-sm";

  return (
    <>
      <header className={headerClasses}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:gap-8 md:py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-orange-600 text-base font-bold text-white md:h-12 md:w-12 md:text-lg">
            AP
          </div>
          <div className="leading-tight">
            <div className="text-lg font-semibold tracking-wide text-zinc-900 md:text-xl">
              Abufa Plywood
            </div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 md:text-xs">
              Plywood &amp; Panels
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-[15px] font-medium text-zinc-700 md:flex">
          {navLinks.map((link) => {
            const isPageLink = link.href.startsWith("/");
            const isActive = isPageLink && pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`border-b-2 pb-1 transition-colors duration-200 ${
                  isActive
                    ? "border-orange-600 text-orange-600"
                    : "border-transparent hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop contact button */}
          <div className="hidden md:block">
            <Button
              onClick={handleContactClick}
              className="flex items-center gap-2 bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 md:text-base"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contact Us</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 shadow-sm md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="border-t border-zinc-100 bg-white/95 px-4 pb-4 pt-2 shadow-sm md:hidden">
          <nav className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
            {navLinks.map((link) => {
              const isPageLink = link.href.startsWith("/");
              const isActive = isPageLink && pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-md px-2 py-2 transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "hover:bg-zinc-50 hover:text-orange-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-3">
            <Button
              onClick={handleContactClick}
              className="flex w-full items-center justify-center gap-2 bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-700"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contact Us</span>
            </Button>
          </div>
        </div>
      )}

      </header>
      {isFixed && <div className="h-[76px] md:h-[80px]" />}
    </>
  );
}
