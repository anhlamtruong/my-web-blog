import { ChangeEvent, useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import Input from "../components/Input";
import ZoomOutFadeIn from "@/components/animations/zoom-out-fade-in";
import {
  signInWithGoogle,
  createUserDocumentFromAuth,
  signInWithGithub,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
} from "@/lib/firebase";

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [showRegister, setShowRegister] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
    setShowRegister((currentShowReg) =>
      currentShowReg === false ? true : false
    );
  }, []);
  const handleSignInWithGoogle = useCallback(async () => {
    try {
      const userCredential = await signInWithGoogle();
      if (!userCredential) return;
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email as string,
        displayName: user.displayName as string,
        photoURL: user.photoURL as string,
      };
      await createUserDocumentFromAuth(userData);
      router.push("/");
      // Redirect user to the protected page
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }, [router]);
  const handleSignInWithGithub = useCallback(async () => {
    try {
      const userCredential = await signInWithGithub();
      if (!userCredential) return;
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email as string,
        displayName: user.displayName as string,
        photoURL: user.photoURL as string,
      };
      await createUserDocumentFromAuth(userData);
      router.push("/");
      // Redirect user to the protected page
    } catch (error) {
      console.error("Error signing in with Github:", error);
    }
  }, [router]);

  const handleSignInWithEmail = useCallback(async () => {
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const handleSignUpWithEmail = useCallback(async () => {
    try {
      await createAuthUserWithEmailAndPassword(email, password, name);
      handleSignInWithEmail();
    } catch (err: unknown) {
      if (err instanceof Error) {
        //*If user already email in used
        if (err.name === "auth/email-already-in-use") {
          toast.error("Cannot create user, email already in use");
        }
      } else {
        toast.error("USER CREATED ENCOUNTERED AN ERROR");
        throw err;
      }
    }
  }, [email, name, password, handleSignInWithEmail]);

  return (
    <div className="relative h-full w-ful bg-no-repeat bg-fixed bg-cover">
      <div className="flex justify-center">
        <div
          className="bg-black bg-opacity-70 px-16 py-16 self-center 
          mt-2 lg:w-2/5 lg:max-w-md rounded-md 
          w-full"
        >
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant === "login" ? "Sign In" : "Register"}
          </h2>
          <div className="flex flex-col gap-4">
            {variant === "register" && (
              <AnimatePresence initial={true} mode="wait">
                {showRegister && (
                  <ZoomOutFadeIn show={showRegister}>
                    <Input
                      value={name}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setName(event.target.value)
                      }
                      label="Username"
                      id="name"
                    />
                  </ZoomOutFadeIn>
                )}
              </AnimatePresence>
            )}

            <Input
              value={email}
              type="email"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              label="Email"
              id="email"
            />
            <Input
              value={password}
              type="password"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
              label="Password"
              id="password"
            />
          </div>
          <button
            onClick={
              variant === "login"
                ? handleSignInWithEmail
                : handleSignUpWithEmail
            }
            className="
            bg-red-600 py-3 text-white rounded-md 
            w-full mt-10 hover:bg-red-700 transition"
          >
            {variant === "login" ? "Login" : "Sign Up"}
          </button>
          <div className="flex flex-row items-center gap-4 mt-8 justify-center">
            <div
              onClick={() => handleSignInWithGoogle()}
              className="
              w-10 h-10 bg-white rounded-full 
              flex items-center justify-center 
              cursor-pointer hover:opacity-80 transition"
            >
              <FcGoogle size={30} />
            </div>
            <div
              onClick={() => handleSignInWithGithub()}
              className="
              w-10 h-10 bg-white rounded-full 
              flex items-center justify-center 
              cursor-pointer hover:opacity-80 transition"
            >
              <FaGithub size={30} />
            </div>
          </div>
          <p className=" text-neutral-500 mt-12">
            {variant === "login"
              ? "First time using Blog?"
              : "Already have an account?"}

            <span
              onClick={toggleVariant}
              className=" text-white ml-1 hover:underline cursor-pointer"
            >
              {variant === "login" ? "Create an account" : "Login"}
            </span>
          </p>
        </div>
        {/* <UploadForm /> */}
      </div>
    </div>
  );
};

export default Auth;
