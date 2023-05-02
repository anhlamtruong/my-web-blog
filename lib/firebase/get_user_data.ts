import { getDoc } from "firebase/firestore";
import { userDocRef } from "./firebaseRef";

export async function getUserData(userId: string) {
  if (!userId) {
    return null;
  }
  const userDocSnap = await getDoc(userDocRef(userId));
  if (userDocSnap.exists()) {
    return userDocSnap.data();
  }
  return null;
}
