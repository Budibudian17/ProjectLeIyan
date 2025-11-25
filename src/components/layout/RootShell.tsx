"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer/Footer";

interface RootShellProps {
  children: ReactNode;
}

export default function RootShell({ children }: RootShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="min-h-screen bg-zinc-50 font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
