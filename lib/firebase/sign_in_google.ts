import { signInWithPopup, UserCredential } from "firebase/auth";
import { auth, provider_google } from "../../utils/firebaseConfig";
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, provider_google);
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
