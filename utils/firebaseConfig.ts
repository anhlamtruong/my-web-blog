import firebase, { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAG7nkxG0Y7A9GbtNqglth_rzMWIPfjzu4",
  authDomain: "creta-698ca.firebaseapp.com",
  projectId: "creta-698ca",
  storageBucket: "creta-698ca.appspot.com",
  messagingSenderId: "785992792677",
  appId: "1:785992792677:web:a7eca88a10d504f4b3648c",
  measurementId: "G-PTB7SE1PKP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider_google = new GoogleAuthProvider();
provider_google.setCustomParameters({
  //* Alway force user to select an account
  prompt: "select_account",
});
const provider_github = new GithubAuthProvider();
export { app, auth, db, storage, provider_google, provider_github };
