import { auth } from "@/utils/firebaseConfig";
import { signOut } from "firebase/auth";

export const signOutUser = async () => await signOut(auth);
