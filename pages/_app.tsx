import "@/styles/globals.scss";

import type { AppProps } from "next/app";
import { ThemeProvider } from "../contexts/ThemeContext";
import React, { useEffect, useState } from "react";
import { Layout, BackgroundGradient } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <BackgroundGradient>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BackgroundGradient>
    </ThemeProvider>
  );
}
