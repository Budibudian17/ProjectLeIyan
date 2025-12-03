"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import type { Product } from "@/lib/products/data";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/products/api";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatPriceInput = (value: string) => {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("id-ID");
};

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    category: "",
    price: "",
    priceMax: "",
    priceMode: "fixed" as "fixed" | "range",
    image: "",
    size: "",
    thickness: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"url" | "file">("url");
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    message: string;
    onConfirm: (() => void) | null;
  }>({ open: false, message: "", onConfirm: null });

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const data = await getProducts();
        if (!isCancelled) {
          setItems(data);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load products from Firestore", error);
          setErrorMessage("Gagal memuat data produk dari server.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      isCancelled = true;
    };
  }, []);

  const startCreate = () => {
    setFormMode("create");
    setEditingId(null);
    setErrorMessage(null);
    setImageInputMode("file");
    setFormValues({
      name: "",
      category: "",
      price: "",
      priceMax: "",
      priceMode: "fixed",
      image: "",
      size: "",
      thickness: "",
      description: "",
    });
  };

  const startEdit = (product: Product) => {
    setFormMode("edit");
    setEditingId(product.id);
    setErrorMessage(null);
    setImageInputMode("file");
    setFormValues({
      name: product.name,
      category: product.category,
      price: Number(product.price || 0).toLocaleString("id-ID"),
      priceMax:
        product.priceType === "range" && product.priceMax
          ? Number(product.priceMax).toLocaleString("id-ID")
          : "",
      priceMode: product.priceType === "range" ? "range" : "fixed",
      image: product.image,
      size: product.size,
      thickness: product.thickness,
      description: product.description,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const priceNumber = Number(formValues.price.replace(/[^0-9]/g, ""));
    const priceMaxNumber = Number(formValues.priceMax.replace(/[^0-9]/g, ""));

    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
      setErrorMessage("Harga minimum harus berupa angka lebih dari 0.");
      return;
    }

    if (formValues.priceMode === "range") {
      if (!Number.isFinite(priceMaxNumber) || priceMaxNumber <= 0) {
        setErrorMessage("Harga maksimum harus berupa angka lebih dari 0.");
        return;
      }

      if (priceMaxNumber <= priceNumber) {
        setErrorMessage("Harga maksimum harus lebih besar dari harga minimum.");
        return;
      }
    }

    if (!formValues.name.trim()) {
      setErrorMessage("Nama produk tidak boleh kosong.");
      return;
    }

    if (formMode === "create") {
      const baseProduct: Omit<Product, "id"> = {
        name: formValues.name.trim(),
        category: formValues.category.trim() || "Uncategorized",
        price: priceNumber,
        priceType: formValues.priceMode,
        priceMax: formValues.priceMode === "range" ? priceMaxNumber : null,
        rating: 0,
        reviewsCount: 0,
        size: formValues.size.trim() || "-",
        thickness: formValues.thickness.trim() || "-",
        description: formValues.description.trim(),
        image: formValues.image.trim() || "/img/placeholder.webp",
      };

      setErrorMessage(null);

      setConfirmState({
        open: true,
        message: "Simpan produk baru ke database?",
        onConfirm: () => {
          void (async () => {
            try {
              const created = await createProduct(baseProduct);
              setItems((prev) => [created, ...prev]);
              setFormMode(null);
              setEditingId(null);
            } catch (error) {
              console.error("Failed to create product", error);
              setErrorMessage("Gagal menyimpan produk baru ke database.");
            }
          })();
        },
      });

      return;
    }

    if (formMode === "edit" && editingId) {
      setConfirmState({
        open: true,
        message: "Simpan perubahan untuk produk ini?",
        onConfirm: () => {
          void (async () => {
            try {
              const payload: Partial<Omit<Product, "id">> = {
                name: formValues.name.trim(),
                category: formValues.category.trim() || "Uncategorized",
                price: priceNumber,
                priceType: formValues.priceMode,
                priceMax: formValues.priceMode === "range" ? priceMaxNumber : null,
                size: formValues.size.trim() || "-",
                thickness: formValues.thickness.trim() || "-",
                description: formValues.description.trim(),
                image: formValues.image.trim() || "/img/placeholder.webp",
              };

              await updateProduct(editingId, payload);

              setItems((prev) =>
                prev.map((item) =>
                  item.id === editingId
                    ? {
                        ...item,
                        ...payload,
                      }
                    : item,
                ),
              );

              setFormMode(null);
              setEditingId(null);
              setErrorMessage(null);
            } catch (error) {
              console.error("Failed to update product", error);
              setErrorMessage("Gagal menyimpan perubahan produk.");
            }
          })();
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    setConfirmState({
      open: true,
      message: "Yakin ingin menghapus produk ini dari database?",
      onConfirm: () => {
        void (async () => {
          try {
            await deleteProduct(id);
            setItems((prev) => prev.filter((item) => item.id !== id));
          } catch (error) {
            console.error("Failed to delete product", error);
            setErrorMessage("Gagal menghapus produk dari database.");
          }
        })();
      },
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Products</h1>
          <p className="text-sm text-zinc-500">
            Kelola katalog produk yang tampil di website utama.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
          onClick={startCreate}
        >
          Tambah Produk
        </button>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>
            {isLoading
              ? "Memuat data produk dari database..."
              : `${items.length} produk terdaftar`}
          </span>
        </div>

        {formMode && (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 rounded-xl border border-zinc-200 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
                  {formMode === "create" ? "Tambah Produk" : "Edit Produk"}
                </p>
              </div>
            </div>

            {/* Image input mode toggle */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-zinc-500">
              <span className="font-medium text-zinc-700">Gambar produk:</span>
              <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageInputMode("url")}
                  className={`rounded-full px-2.5 py-1 transition-colors ${
                    imageInputMode === "url"
                      ? "bg-orange-600 text-white"
                      : "text-zinc-700 hover:bg-white"
                  }`}
                >
                  Pakai URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode("file")}
                  className={`rounded-full px-2.5 py-1 transition-colors ${
                    imageInputMode === "file"
                      ? "bg-orange-600 text-white"
                      : "text-zinc-700 hover:bg-white"
                  }`}
                >
                  Upload File
                </button>
              </div>
              <span className="text-[10px] text-zinc-400">
                Pilih salah satu cara. Jika upload file, URL akan terisi otomatis.
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">Upload File Gambar (opsional)</label>
              <input
                type="file"
                accept="image/*"
                disabled={imageInputMode !== "file"}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  void (async () => {
                    try {
                      setIsUploadingImage(true);
                      const { uploadToCloudinary } = await import("@/lib/cloudinary/upload");
                      const url = await uploadToCloudinary(file);
                      setFormValues((prev) => ({ ...prev, image: url }));
                      setErrorMessage(null);
                    } catch (error) {
                      console.error("Failed to upload image to Cloudinary", error);
                      setErrorMessage("Gagal mengunggah gambar ke Cloudinary. Coba lagi.");
                    } finally {
                      setIsUploadingImage(false);
                    }
                  })();
                }}
                className={`block w-full rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 file:mr-3 file:rounded-md file:border-0 file:bg-orange-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:border-orange-400 ${
                  imageInputMode !== "file" ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                }`}
              />
              <p className="text-[11px] text-zinc-500">
                {imageInputMode === "file"
                  ? "Jika memilih file, gambar akan di-upload ke Cloudinary dan URL-nya otomatis terisi di kolom URL gambar."
                  : "Aktifkan mode Upload File jika ingin memilih file dari perangkat."}
              </p>
              {isUploadingImage && (
                <p className="text-[11px] text-orange-600">Sedang mengunggah gambar ke Cloudinary...</p>
              )}
            </div>

            {errorMessage && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">Nama Produk</label>
                <input
                  type="text"
                  value={formValues.name}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="Contoh: Plywood Premium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">Jenis Kayu</label>
                <input
                  type="text"
                  value={formValues.category}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, category: event.target.value }))
                  }
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="Contoh: Plywood, MDF, Partikel Board"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">Harga</label>

                <div className="flex flex-wrap items-center gap-1 text-[11px] text-zinc-500">
                  <span className="text-[11px]">Tipe harga:</span>
                  <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() =>
                        setFormValues((prev) => ({ ...prev, priceMode: "fixed" }))
                      }
                      className={`rounded-full px-2.5 py-1 transition-colors ${
                        formValues.priceMode === "fixed"
                          ? "bg-orange-600 text-white"
                          : "text-zinc-700 hover:bg-white"
                      }`}
                    >
                      Harga tetap
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormValues((prev) => ({ ...prev, priceMode: "range" }))
                      }
                      className={`rounded-full px-2.5 py-1 transition-colors ${
                        formValues.priceMode === "range"
                          ? "bg-orange-600 text-white"
                          : "text-zinc-700 hover:bg-white"
                      }`}
                    >
                      Range harga
                    </button>
                  </div>
                </div>

                {formValues.priceMode === "fixed" ? (
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formValues.price}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        price: formatPriceInput(event.target.value),
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    placeholder="Contoh: 250000 (akan menjadi 250.000)"
                  />
                ) : (
                  <div className="mt-1 grid gap-2 sm:grid-cols-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formValues.price}
                      onChange={(event) =>
                        setFormValues((prev) => ({
                          ...prev,
                          price: formatPriceInput(event.target.value),
                        }))
                      }
                      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      placeholder="Harga minimum (mis. 250000)"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formValues.priceMax}
                      onChange={(event) =>
                        setFormValues((prev) => ({
                          ...prev,
                          priceMax: formatPriceInput(event.target.value),
                        }))
                      }
                      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      placeholder="Harga maksimum (mis. 350000)"
                    />
                  </div>
                )}

                <p className="mt-1 text-[11px] text-zinc-500">
                  Angka akan otomatis diformat 20.000, 250.000, dst. Untuk material dengan banyak ukuran,
                  gunakan mode <span className="font-semibold">Range harga</span>.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">URL Gambar</label>
                <input
                  type="text"
                  value={formValues.image}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, image: event.target.value }))
                  }
                  readOnly={imageInputMode === "file"}
                  className={`w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:ring-2 focus:ring-orange-200 ${
                    imageInputMode === "file"
                      ? "bg-zinc-100 text-zinc-500 focus:border-zinc-300"
                      : "bg-white focus:border-orange-500"
                  }`}
                  placeholder={
                    imageInputMode === "file"
                      ? "URL akan terisi otomatis setelah upload gambar"
                      : "/img/plywood.webp atau URL lain"
                  }
                />
                <p className="text-[11px] text-zinc-500">
                  {imageInputMode === "file"
                    ? "URL ini berasal dari hasil upload ke Cloudinary."
                    : "Isi URL gambar langsung (misalnya dari Cloudinary atau sumber lain)."}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">Ukuran</label>
                <input
                  type="text"
                  value={formValues.size}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, size: event.target.value }))
                  }
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="Contoh: 1220 x 2440 mm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">Ketebalan</label>
                <input
                  type="text"
                  value={formValues.thickness}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, thickness: event.target.value }))
                  }
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="Contoh: 9 / 12 / 15 / 18 mm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">Deskripsi Singkat</label>
              <textarea
                rows={3}
                value={formValues.description}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, description: event.target.value }))
                }
                className="w-full resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                placeholder="Ringkasan singkat produk untuk ditampilkan di kartu."
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setFormMode(null);
                  setEditingId(null);
                  setErrorMessage(null);
                }}
                className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isUploadingImage}
                className={`inline-flex items-center justify-center rounded-md px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors ${
                  isUploadingImage
                    ? "cursor-not-allowed bg-orange-300"
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {isUploadingImage
                  ? "Menunggu upload gambar..."
                  : formMode === "create"
                    ? "Simpan Produk"
                    : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <article
              key={product.id}
              className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-40 w-full bg-zinc-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 100vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600">
                      {product.category}
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-zinc-900 line-clamp-2">
                      {product.name}
                    </h2>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                    {product.rating.toFixed(1)}/5
                  </span>
                </div>

                <p className="text-xs text-zinc-500 line-clamp-2">{product.description}</p>

                <div className="mt-1 text-sm font-semibold text-orange-600">
                  {product.priceType === "range" && product.priceMax &&
                  product.priceMax > product.price
                    ? `${formatPrice(product.price)} - ${formatPrice(product.priceMax)}`
                    : formatPrice(product.price)}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Lihat di website
                  </Link>

                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 hover:border-blue-500 hover:text-blue-600"
                      onClick={() => startEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 hover:border-red-500 hover:text-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {confirmState.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
            <h2 className="text-sm font-semibold text-zinc-900">Konfirmasi</h2>
            <p className="mt-2 text-sm text-zinc-600">{confirmState.message}</p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                onClick={() => setConfirmState({ open: false, message: "", onConfirm: null })}
              >
                Batal
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-700"
                onClick={() => {
                  if (confirmState.onConfirm) {
                    confirmState.onConfirm();
                  }
                  setConfirmState({ open: false, message: "", onConfirm: null });
                }}
              >
                Ya, lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
