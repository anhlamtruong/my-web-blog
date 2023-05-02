import { signInWithPopup, UserCredential } from "firebase/auth";
import { auth, provider_github } from "../../utils/firebaseConfig";
export const signInWithGithub = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, provider_github);
    return result;
  } catch (error) {
    console.error("Error signing in with Github:", error);
    throw error;
  }
};
