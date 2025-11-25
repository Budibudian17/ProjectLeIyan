import { doc, increment, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export type StatFieldKey =
  | "totalVisitors"
  | "contactClicks"
  | "productPageViews"
  | "galleryPageViews";

export async function incrementStat(field: StatFieldKey): Promise<void> {
  try {
    const globalRef = doc(db, "stats", "global");

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const todayId = `${year}-${month}-${day}`;

    const dailyRef = doc(db, "dailyVisitors", todayId);

    await Promise.all([
      setDoc(
        globalRef,
        {
          [field]: increment(1),
        },
        { merge: true },
      ),
      setDoc(
        dailyRef,
        {
          [field]: increment(1),
        },
        { merge: true },
      ),
    ]);
  } catch (error) {
    console.error("Failed to increment stat", field, error);
  }
}
