"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer/Footer";

interface RootShellProps {
  children: ReactNode;
}

export default function RootShell({ children }: RootShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname.startsWith("/admin");

  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedRole = window.sessionStorage.getItem("abufa_role");
    if (storedRole === "admin" || storedRole === "user") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole(storedRole);
    }
  }, []);

  function handleSelectUser() {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("abufa_role", "user");
    }
    setRole("user");
    setErrorMessage(null);
    if (isAdminRoute) {
      router.push("/");
    }
  }

  function handleAdminSubmit() {
    const expectedPassword =
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD && process.env.NEXT_PUBLIC_ADMIN_PASSWORD.length > 0
        ? process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        : "abufa-admin";

    if (adminPassword !== expectedPassword) {
      setErrorMessage("Password admin salah.");
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("abufa_role", "admin");
    }
    setRole("admin");
    setErrorMessage(null);
    if (!isAdminRoute) {
      router.push("/admin");
    }
  }

  const shouldShowGate = role === null || (isAdminRoute && role !== "admin");

  if (shouldShowGate) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold text-zinc-900">Pilih mode akses</h1>
          <p className="mt-1 text-xs text-zinc-500">
            Masuk sebagai pengunjung atau admin. Aktivitas admin tidak akan dihitung dalam statistik
            pengunjung.
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <button
              type="button"
              onClick={handleSelectUser}
              className="flex w-full items-center justify-between rounded-lg border border-zinc-200 px-3 py-2.5 text-left transition-colors hover:border-orange-500 hover:bg-orange-50"
            >
              <span>
                <span className="block font-medium text-zinc-900">Masuk sebagai Pengunjung</span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  Cocok untuk calon pelanggan yang ingin melihat produk dan gallery.
                </span>
              </span>
              <span className="ml-3 text-xs font-semibold text-orange-600">Tanpa password</span>
            </button>

            <div className="rounded-lg border border-zinc-200 px-3 py-3">
              <p className="text-sm font-medium text-zinc-900">Masuk sebagai Admin</p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Memerlukan password. Data kunjungan tidak akan bertambah saat Anda mengakses situs.
              </p>

              <input
                type="password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                placeholder="Masukkan password admin"
                className="mt-3 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />

              {errorMessage && (
                <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
              )}

              <button
                type="button"
                onClick={handleAdminSubmit}
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Masuk Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
