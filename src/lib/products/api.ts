import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Product } from "@/lib/products/data";

const COLLECTION_NAME = "products";

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((d) => {
    const data = d.data() as Omit<Product, "id"> & { id?: string };

    return {
      id: data.id ?? d.id,
      name: data.name,
      category: data.category,
      price: data.price,
      priceType: data.priceType,
      priceMax: data.priceMax,
      rating: data.rating ?? 0,
      reviewsCount: data.reviewsCount ?? 0,
      size: data.size,
      thickness: data.thickness,
      description: data.description,
      image: data.image,
    };
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  const ref = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  const data = snapshot.data() as Omit<Product, "id"> & { id?: string };

  return {
    id: data.id ?? snapshot.id,
    name: data.name,
    category: data.category,
    price: data.price,
    priceType: data.priceType,
    priceMax: data.priceMax,
    rating: data.rating ?? 0,
    reviewsCount: data.reviewsCount ?? 0,
    size: data.size,
    thickness: data.thickness,
    description: data.description,
    image: data.image,
  };
}

export async function createProduct(input: Omit<Product, "id">): Promise<Product> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), input);

  return {
    ...input,
    id: docRef.id,
  };
}

export async function updateProduct(
  id: string,
  input: Partial<Omit<Product, "id">>,
): Promise<void> {
  const ref = doc(db, COLLECTION_NAME, id);
  await updateDoc(ref, input);
}

export async function deleteProduct(id: string): Promise<void> {
  const ref = doc(db, COLLECTION_NAME, id);
  await deleteDoc(ref);
}
