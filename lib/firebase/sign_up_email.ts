import { auth } from "@/utils/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUserDocumentFromAuth } from "./save_user_to_firestore";

//*function SIGN UP WITH EMAIL AND PASSWORD **//
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    if (!email || !password) return;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (!userCredential) return;
    const user = userCredential.user;
    // Set the displayName for the user
    await updateProfile(user, {
      displayName: name,
    });
    const userData = {
      uid: user.uid,
      email: user.email as string,
      displayName: name,
      photoURL: user.photoURL as string,
    };
    await createUserDocumentFromAuth(userData);
  } catch (err) {
    console.log("FAIL");
    throw err;
  }
};
