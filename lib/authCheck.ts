// lib/authCheck.ts
import { GetServerSidePropsContext } from "next";
import { auth } from "../utils/firebaseConfig";
import { Auth } from "firebase/auth";
export const redirectIfNotAuthenticated = (
  auth: Auth,
  context: GetServerSidePropsContext
) => {
  const user = auth.currentUser;

  if (!user) {
    return {
      redirect: {
        destination: "/auth", // The sign-in page path
        permanent: false,
      },
    };
  }
};
