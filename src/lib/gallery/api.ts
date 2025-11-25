import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { GalleryItem } from "@/lib/gallery/data";

const COLLECTION_NAME = "gallery";

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((d) => {
    const data = d.data() as Omit<GalleryItem, "id"> & { id?: string };

    return {
      id: data.id ?? d.id,
      src: data.src,
      alt: data.alt,
    };
  });
}

export async function createGalleryItem(input: Omit<GalleryItem, "id">): Promise<GalleryItem> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), input);

  return {
    ...input,
    id: docRef.id,
  };
}

export async function updateGalleryItem(
  id: string,
  input: Partial<Omit<GalleryItem, "id">>,
): Promise<void> {
  const ref = doc(db, COLLECTION_NAME, id);
  await updateDoc(ref, input);
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const ref = doc(db, COLLECTION_NAME, id);
  await deleteDoc(ref);
}
