import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase/client";

export const auth = getAuth(app);
