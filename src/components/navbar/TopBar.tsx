"use client";

import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Phone, Clock, MapPin, Youtube } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-zinc-900 text-[11px] text-zinc-100 sm:text-sm md:text-[15px]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <div className="flex flex-wrap items-center gap-5">
          <a
            href="tel:+6281210509196"
            className="flex items-center gap-2.5 transition-colors duration-200 hover:text-orange-400"
          >
            <Phone className="h-4 w-4 md:h-5 md:w-5" />
            <span>+62 812-1050-9196</span>
          </a>
          <div className="hidden items-center gap-2.5 md:flex">
            <MapPin className="h-4 w-4 md:h-5 md:w-5" />
            <span>Depok, Indonesia</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2.5 border-zinc-700 pr-3 text-[11px] sm:text-sm md:border-r md:pr-4">
            <Clock className="h-4 w-4 md:h-5 md:w-5" />
            <span>Mon - Fri: 08:00 - 18:00</span>
          </div>
          <div className="flex items-center gap-2.5 text-xl">
            <Link
              href="#"
              aria-label="Facebook"
              className="transition-colors duration-200 hover:text-orange-400"
            >
              <Facebook className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="transition-colors duration-200 hover:text-orange-400"
            >
              <Instagram className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
            <Link
              href="#"
              aria-label="WhatsApp"
              className="transition-colors duration-200 hover:text-orange-400"
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
            <Link
              href="#"
              aria-label="YouTube"
              className="transition-colors duration-200 hover:text-orange-400"
            >
              <Youtube className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
