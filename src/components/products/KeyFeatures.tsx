"use client";

import { 
  Award, 
  Leaf, 
  LayoutGrid, 
  Tag, 
  ShieldCheck, 
  Truck 
} from "lucide-react";

const features = [
  {
    title: "Material Berkualitas Premium",
    description: "Plywood kami terbuat dari veneer kayu pilihan dan perekat berkualitas tinggi, menjamin kekuatan dan daya tahan yang unggul untuk semua kebutuhan konstruksi dan furnitur Anda.",
    icon: <Award className="h-6 w-6 text-[#942d2e]" />,
  },
  {
    title: "Produksi Ramah Lingkungan",
    description: "Kami berkomitmen pada praktik kehutanan berkelanjutan dan menggunakan perekat ramah lingkungan yang memenuhi standar lingkungan internasional.",
    icon: <Leaf className="h-6 w-6 text-[#942d2e]" />,
  },
  {
    title: "Beragam Pilihan Produk",
    description: "Dari berbagai ketebalan hingga jenis kayu dan finishing yang berbeda, kami menawarkan pilihan lengkap untuk memenuhi berbagai kebutuhan proyek Anda.",
    icon: <LayoutGrid className="h-6 w-6 text-[#942d2e]" />,
  },
  {
    title: "Harga Kompetitif",
    description: "Dapatkan produk plywood berkualitas tinggi dengan harga terbaik tanpa mengorbankan kualitas produk kami.",
    icon: <Tag className="h-6 w-6 text-[#942d2e]" />,
  },
  {
    title: "Dikerjakan oleh Ahli",
    description: "Setiap lembaran melalui kontrol kualitas ketat untuk memastikan permukaan yang halus, ketebalan yang konsisten, dan tepian yang sempurna untuk hasil profesional.",
    icon: <ShieldCheck className="h-6 w-6 text-[#942d2e]" />,
  },
  {
    title: "Pengiriman Cepat & Andal",
    description: "Kami memastikan pengiriman tepat waktu dengan penanganan yang hati-hati untuk menjaga kualitas produk selama dalam perjalanan.",
    icon: <Truck className="h-6 w-6 text-[#942d2e]" />,
  },
];

export default function KeyFeatures() {
  return (
    <section className="py-16 bg-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="text-sm font-semibold text-[#942d2e] mb-2">
            KEY FEATURES
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl mb-4">
            Keunggulan Produk Kami
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Kami menyediakan produk plywood berkualitas tinggi yang memenuhi standar dan harapan pelanggan
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-6 rounded-lg border border-zinc-200 hover:border-orange-300 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-start">
                <div className="shrink-0">
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-zinc-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
