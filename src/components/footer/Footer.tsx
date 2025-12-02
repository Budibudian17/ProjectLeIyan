"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14 md:py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left: Logo + description + socials */}
          <div className="max-w-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-sm bg-white md:h-12 md:w-12">
            <Image
              src="/img/logo.webp"
              alt="Abufa Plywood logo"
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </div>
              <div>
                <p className="text-lg font-semibold tracking-wide text-white md:text-xl">Abufa Plywood</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 md:text-xs">
                  Plywood &amp; Panels
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Abufa Plywood adalah penyedia material kayu dan panel lembaran di Depok, menghadirkan
              plywood, MDF, block melamin, partikel board, dan phenolic film untuk kebutuhan furniture
              dan interior proyek.
            </p>
            <p className="text-sm font-semibold text-zinc-200">Jika tertarik, hubungi kami:</p>
            <div className="flex items-center gap-3 text-zinc-400">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 transition-colors duration-200 hover:bg-orange-600 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 transition-colors duration-200 hover:bg-orange-600 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 transition-colors duration-200 hover:bg-orange-600 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Middle: Company links */}
          <div className="space-y-3 text-sm">
            <p className="text-sm font-semibold text-white">Company</p>
            <ul className="space-y-2 text-zinc-400">
              {[
                "About Us",
                "Products",
                "Gallery",
                "Testimonials",
                "FAQ",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="border-b-2 border-transparent pb-[2px] text-left text-sm text-zinc-400 transition-colors duration-200 hover:border-orange-500 hover:text-orange-400"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Business Hours & Address */}
          <div className="flex flex-1 flex-col gap-6 text-sm md:flex-row md:justify-end md:gap-12">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-white">Business Hours</p>
              <div className="flex items-start gap-2 text-zinc-400">
                <Clock className="mt-[2px] h-4 w-4 text-orange-500" />
                <div>
                  <p>Mon - Fri: 08:00 - 18:00</p>
                  <p>Weekend & tanggal merah: by request</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-white">Address</p>
              <div className="flex items-start gap-2 text-zinc-400">
                <MapPin className="mt-[2px] h-4 w-4 text-orange-500" />
                <p>Depok, Indonesia.</p>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Phone className="h-4 w-4 text-orange-500" />
                <span>+62 812-1050-9196</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Mail className="h-4 w-4 text-orange-500" />
                <span>info@leiyan-material.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-800 pt-4 text-xs text-zinc-500 sm:mt-10">
          <p>© {new Date().getFullYear()} Abufa Plywood. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
