import "@/styles/globals.scss";
import { Toaster } from "react-hot-toast";

import type { AppProps } from "next/app";
import { ThemeProvider } from "../contexts/ThemeContext";
import React, { useEffect, useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { Layout, BackgroundGradient } from "@/components";
// import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    // <SessionProvider session={session} refetchInterval={5 * 60}>
    <AuthProvider>
      <ThemeProvider>
        <BackgroundGradient>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BackgroundGradient>
        <Toaster position="bottom-right" reverseOrder={false} />
      </ThemeProvider>
    </AuthProvider>

    // </SessionProvider>
  );
}
