import "@/styles/globals.scss";

import type { AppProps } from "next/app";
import { ThemeProvider } from "../contexts/ThemeContext";
import React, { useEffect, useState } from "react";
import { Layout, BackgroundGradient } from "@/components";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ThemeProvider>
        <BackgroundGradient>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BackgroundGradient>
      </ThemeProvider>
    </SessionProvider>
  );
}
