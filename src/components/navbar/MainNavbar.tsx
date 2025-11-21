"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#", label: "Home", active: true },
  { href: "#products", label: "Products", active: false },
  { href: "#about", label: "About Us", active: false },
  { href: "#pages", label: "Pages", active: false },
  { href: "#blog", label: "Blog", active: false },
  { href: "#gallery", label: "Gallery", active: false },
];

export default function MainNavbar() {
  const [isFixed, setIsFixed] = useState(false);

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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-orange-600 text-base font-bold text-white md:h-12 md:w-12 md:text-lg">
            LY
          </div>
          <div className="leading-tight">
            <div className="text-lg font-semibold tracking-wide text-zinc-900 md:text-xl">
              Le Iyan
            </div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 md:text-xs">
              Bricks &amp; Blocks
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-[15px] font-medium text-zinc-700 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`border-b-2 pb-1 transition-colors duration-200 ${
                link.active
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent hover:border-orange-600 hover:text-orange-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button className="bg-orange-600 px-6 py-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg active:translate-y-0 md:text-base">
            Contact Us
          </Button>
        </div>
      </div>
      </header>
      {isFixed && <div className="h-[80px]" />}
    </>
  );
}
