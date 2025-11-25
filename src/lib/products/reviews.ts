import {
  addDoc,
  collection,
  getDocs,
  limit as firestoreLimit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export interface ProductReview {
  id: string;
  productId: string;
  name: string;
  rating: number;
  text: string;
  createdAt: Date | null;
}

const COLLECTION_NAME = "productReviews";

export async function getReviewsForProduct(productId: string): Promise<ProductReview[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("productId", "==", productId),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as {
      productId: string;
      name: string;
      rating: number;
      text: string;
      createdAt?: { toDate: () => Date } | null;
    };

    return {
      id: docSnap.id,
      productId: data.productId,
      name: data.name,
      rating: data.rating,
      text: data.text,
      createdAt: data.createdAt ? data.createdAt.toDate() : null,
    };
  });
}

export async function getLatestReviews(options?: { limit?: number }): Promise<ProductReview[]> {
  const max = options?.limit ?? 6;

  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc"),
    firestoreLimit(max),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as {
      productId: string;
      name: string;
      rating: number;
      text: string;
      createdAt?: { toDate: () => Date } | null;
    };

    return {
      id: docSnap.id,
      productId: data.productId,
      name: data.name,
      rating: data.rating,
      text: data.text,
      createdAt: data.createdAt ? data.createdAt.toDate() : null,
    };
  });
}

export async function addReviewForProduct(input: {
  productId: string;
  name: string;
  rating: number;
  text: string;
}): Promise<ProductReview> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...input,
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    productId: input.productId,
    name: input.name,
    rating: input.rating,
    text: input.text,
    createdAt: null,
  };
}
