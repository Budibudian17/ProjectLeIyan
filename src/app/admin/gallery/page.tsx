"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery/data";
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/lib/gallery/api";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    src: "",
    alt: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
        const data = await getGalleryItems();
        if (!isCancelled) {
          setItems(data);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load gallery items from Firestore", error);
          setErrorMessage("Gagal memuat data gallery dari server.");
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
    setFormValues({ src: "", alt: "" });
  };

  const startEdit = (item: GalleryItem) => {
    setFormMode("edit");
    setEditingId(item.id);
    setErrorMessage(null);
    setFormValues({ src: item.src, alt: item.alt });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.src.trim()) {
      setErrorMessage("URL atau file gambar harus diisi.");
      return;
    }

    if (formMode === "create") {
      const baseItem: Omit<GalleryItem, "id"> = {
        src: formValues.src.trim(),
        alt: formValues.alt.trim() || "Dokumentasi Abufa Plywood",
      };

      setErrorMessage(null);

      setConfirmState({
        open: true,
        message: "Simpan foto baru ke database?",
        onConfirm: () => {
          void (async () => {
            try {
              const created = await createGalleryItem(baseItem);
              setItems((prev) => [created, ...prev]);
              setFormMode(null);
              setEditingId(null);
            } catch (error) {
              console.error("Failed to create gallery item", error);
              setErrorMessage("Gagal menyimpan foto baru ke database.");
            }
          })();
        },
      });

      return;
    }

    if (formMode === "edit" && editingId) {
      setConfirmState({
        open: true,
        message: "Simpan perubahan untuk foto ini?",
        onConfirm: () => {
          void (async () => {
            try {
              const payload: Partial<Omit<GalleryItem, "id">> = {
                src: formValues.src.trim(),
                alt: formValues.alt.trim(),
              };

              await updateGalleryItem(editingId, payload);

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
              console.error("Failed to update gallery item", error);
              setErrorMessage("Gagal menyimpan perubahan foto.");
            }
          })();
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    setConfirmState({
      open: true,
      message: "Yakin ingin menghapus foto ini dari database?",
      onConfirm: () => {
        void (async () => {
          try {
            await deleteGalleryItem(id);
            setItems((prev) => prev.filter((item) => item.id !== id));
          } catch (error) {
            console.error("Failed to delete gallery item", error);
            setErrorMessage("Gagal menghapus foto dari database.");
          }
        })();
      },
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Gallery</h1>
          <p className="text-sm text-zinc-500">
            Kelola foto gallery yang tampil di halaman utama.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
          onClick={startCreate}
        >
          Tambah Foto
        </button>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>
            {isLoading
              ? "Memuat data gallery dari database..."
              : `${items.length} foto terdaftar`}
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
                  {formMode === "create" ? "Tambah Foto" : "Edit Foto"}
                </p>
                <p className="text-xs text-zinc-500">
                  Perubahan hanya berlaku di halaman admin ini (data sumber tetap hardcode).
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">URL Gambar</label>
              <input
                type="text"
                value={formValues.src}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, src: event.target.value }))
                }
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                placeholder="/img/doc1.webp atau URL lain"
              />
              <p className="text-[11px] text-zinc-500">
                Bisa isi URL gambar langsung, atau pilih file di bawah.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">Upload File Gambar (opsional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  const objectUrl = URL.createObjectURL(file);
                  setFormValues((prev) => ({ ...prev, src: objectUrl }));
                }}
                className="block w-full cursor-pointer rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 file:mr-3 file:rounded-md file:border-0 file:bg-orange-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:border-orange-400"
              />
              <p className="text-[11px] text-zinc-500">
                Jika memilih file, gambar hanya tersimpan sementara di browser (demo, tidak di-upload ke server).
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">Deskripsi Alt (opsional)</label>
              <input
                type="text"
                value={formValues.alt}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, alt: event.target.value }))
                }
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                placeholder="Contoh: Dokumentasi gudang Abufa Plywood"
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
                className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-700"
              >
                {formMode === "create" ? "Simpan Foto" : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        )}

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative h-40 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-44 md:h-48"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex items-center justify-between px-3 pb-2 pt-3 text-xs text-zinc-50">
                <div className="line-clamp-1 text-[11px] font-medium">
                  {item.alt || "Dokumentasi Abufa Plywood"}
                </div>
                <div className="inline-flex gap-1">
                  <button
                    type="button"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-300/60 bg-black/30 text-zinc-100 hover:border-blue-400 hover:bg-blue-500/80"
                    onClick={() => startEdit(item)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-300/60 bg-black/30 text-zinc-100 hover:border-red-400 hover:bg-red-500/80"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
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
