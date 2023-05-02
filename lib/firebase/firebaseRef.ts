import { db } from "@/utils/firebaseConfig";
import { collection, doc } from "firebase/firestore";

export const usersRef = collection(db, "users");
export const userDocRef = (userId: string) => doc(db, "users", userId);
