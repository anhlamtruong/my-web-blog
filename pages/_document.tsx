import { Html, Head, Main, NextScript } from "next/document";
import { useTheme, getLinearGradient } from "../contexts/ThemeContext";

export const metadata = {
  title: "Creata",
  description: " An application, trying to make a better world",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
