"use client";

import { Hammer } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80">
      <div className="flex flex-col items-center gap-5 text-center">
        {/* Saw + wood illustration */}
        <div className="relative flex items-center gap-4">
          {/* Wood plank */}
          <div className="h-3 w-40 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 shadow-lg shadow-amber-900/40" />

          {/* Tool icon */}
          <Hammer className="h-10 w-10 text-zinc-100 drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] animate-saw-cut" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500 sm:text-sm">
            Loading
          </p>
          <p className="text-sm text-zinc-200 sm:text-base">
            Gergaji lagi memotong kayu, tunggu sebentar ya...
          </p>
        </div>
      </div>
    </div>
  );
}
