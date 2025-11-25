"use client";

import Image from "next/image";

const specs = [
  {
    label: "Ukuran",
    value: "1220 mm x 2440 mm",
    position: "left-top",
  },
  {
    label: "Ketebalan",
    value: "2,7 / 3,6 / 5 / 7,5 / 8,5 / 11,5 / 15 / 18 mm",
    position: "right-top",
  },
  {
    label: "Jenis Kayu",
    value: "Meranti, Tropical Hardwood, Falcata",
    position: "left-middle",
  },
  {
    label: "Perekat",
    value: "T-1, T-2, WBP",
    position: "right-middle",
  },
  {
    label: "Aplikasi Utama",
    value: "Furniture, kitchen set, panel dinding",
    position: "left-bottom",
  },
  {
    label: "Kualitas",
    value: "Grade proyek & interior rumahan",
    position: "right-bottom",
  },
];

export default function ProductOverview() {
  return (
    <section className="bg-orange-50/60 py-12 sm:py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4">
        <div className="max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            Product Overview
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Produk <b>BEST SELLER</b> Abufa Plywood
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
            Plywood dan MDF pilihan kami dirancang untuk memberikan kekuatan yang stabil, permukaan
            yang rapi, dan proses pengerjaan yang lebih mudah untuk tukang maupun pengrajin
            interior.
          </p>
        </div>

        <div className="relative mt-4 w-full max-w-5xl">
          {/* Center image only */}
          <div className="relative mx-auto flex h-72 w-full max-w-[800px] items-center justify-center translate-y-[-30px] sm:h-80 md:h-96">
            <Image
              src="/img/plywoodrmvbg2.webp"
              alt="Produk best seller Abufa Plywood"
              width={800}
              height={600}
              className="h-52 w-auto object-contain drop-shadow-md sm:h-60 md:h-96"
            />
          </div>

          {/* Spec boxes */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {/* left column */}
            <div className="absolute left-0 top-4 flex flex-col gap-8">
              {specs
                .filter((s) => s.position === "left-top" || s.position === "left-middle" || s.position === "left-bottom")
                .map((spec) => (
                  <SpecItem key={spec.label} label={spec.label} value={spec.value} align="left" />
                ))}
            </div>
            {/* right column */}
            <div className="absolute right-0 top-8 flex flex-col gap-8">
              {specs
                .filter((s) => s.position === "right-top" || s.position === "right-middle" || s.position === "right-bottom")
                .map((spec) => (
                  <SpecItem key={spec.label} label={spec.label} value={spec.value} align="right" />
                ))}
            </div>
          </div>

          {/* Simple stacked specs for mobile */}
          <div className="mt-6 grid gap-3 text-sm text-zinc-700 md:hidden">
            {specs.map((spec) => (
              <div key={spec.label} className="rounded-xl bg-white/70 px-4 py-3 text-left shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                  {spec.label}
                </p>
                <p className="mt-1 text-sm text-zinc-800">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecItem({
  label,
  value,
  align,
}: {
  label: string;
  value: string;
  align: "left" | "right";
}) {
  const isLeft = align === "left";
  return (
    <div
      className={`flex items-center gap-3 text-sm text-zinc-800 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{label}</p>
        <p className="mt-1 text-sm">{value}</p>
      </div>
      <div className="h-px w-10 bg-zinc-500" />
    </div>
  );
}
