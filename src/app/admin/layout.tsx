"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/gallery", label: "Gallery" },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900">
      {/* Mobile top navbar */}
      <div className="fixed inset-x-0 top-0 z-40 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-600">
              Admin Panel
            </div>
            <div className="text-sm font-semibold text-zinc-900">Abufa Plywood</div>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mt-3 space-y-1 text-sm font-medium text-zinc-600">
            {links.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-72 flex-col border-r border-zinc-200 bg-white px-6 py-8 shadow-sm md:flex">
        <div className="mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-600">
            Admin Panel
          </div>
          <div className="text-lg font-semibold text-zinc-900">Abufa Plywood</div>
        </div>

        <nav className="space-y-1 text-sm font-medium text-zinc-600">
          {links.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto text-xs text-zinc-400">
          © {new Date().getFullYear()} Abufa Plywood
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-zinc-50 px-4 pb-8 pt-20 md:px-8 md:py-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
