import { auth } from "@/utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

//*function SIGN IN WITH EMAIL AND PASSWORD **//
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    if (!email || !password) return;
    return signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
};
