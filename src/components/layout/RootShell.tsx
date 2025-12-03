"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer/Footer";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/client";

interface RootShellProps {
  children: ReactNode;
}

export default function RootShell({ children }: RootShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname.startsWith("/admin");

  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsCheckingAdmin(true);
      setErrorMessage(null);

      if (!user) {
        setRole(null);
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem("abufa_role");
        }
        setIsCheckingAdmin(false);
        return;
      }

      try {
        const adminRef = doc(db, "admins", user.uid);
        const snapshot = await getDoc(adminRef);

        if (snapshot.exists()) {
          setRole("admin");
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem("abufa_role", "admin");
          }
        } else {
          setRole("user");
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem("abufa_role", "user");
          }
        }
      } catch (error) {
        console.error("Failed to check admin role", error);
        setRole("user");
      } finally {
        setIsCheckingAdmin(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  function handleSelectUser() {
    setRole("user");
    setErrorMessage(null);
    if (isAdminRoute) {
      router.push("/");
    }
  }

  async function handleAdminSubmit() {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await signInWithEmailAndPassword(auth, adminEmail.trim(), adminPassword.trim());

      if (!isAdminRoute) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Failed to sign in as admin", error);
      setErrorMessage("Login admin gagal. Periksa email dan password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      setRole(null);
      setAdminEmail("");
      setAdminPassword("");
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("abufa_role");
      }
      if (isAdminRoute) {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  }

  const shouldShowGate =
    role === null ||
    isCheckingAdmin ||
    (isAdminRoute && role !== "admin");

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
                Memerlukan akun admin (email & password) dari pemilik website. Data kunjungan tidak
                akan bertambah saat Anda mengakses situs sebagai admin.
              </p>

              <input
                type="email"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                placeholder="Email admin"
                className="mt-3 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />

              <input
                type="password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                placeholder="Password admin"
                className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />

              {currentUser && role !== "admin" && !isCheckingAdmin && (
                <p className="mt-1 text-xs text-red-600">
                  Akun ini tidak terdaftar sebagai admin. Hubungi pemilik website jika ini adalah akun
                  admin.
                </p>
              )}

              {errorMessage && (
                <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
              )}

              <button
                type="button"
                onClick={handleAdminSubmit}
                disabled={isSubmitting}
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-70"
              >
                {isSubmitting ? "Memproses..." : "Masuk Admin"}
              </button>

              {currentUser && role === "admin" && !isCheckingAdmin && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  Keluar dari akun admin
                </button>
              )}
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
