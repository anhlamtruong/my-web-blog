import React, { createContext, useContext, useEffect, useState } from "react";
export type Theme = "light" | "dark" | "ocean-blue" | "tokyo-night";

type ThemeColors = {
  [key in Theme]: {
    background: string;
    text: string;
    hoverText: string;
    hoverBorder: string;
    hoverBackground: string;
  };
};

const themeColors: ThemeColors = {
  light: {
    background: "rgba(249, 250, 251, 0.915)",
    text: "#1f2937",
    hoverText: "#3b82f6",
    hoverBorder: "#1f2937",
    hoverBackground: "#3b82f6",
  },
  dark: {
    background: "rgba(31, 41, 55, 0.915)",
    text: "#f9fafb",
    hoverText: "#ec4899",
    hoverBorder: "#4b5563",
    hoverBackground: "#8b5cf6",
  },
  "ocean-blue": {
    background: "rgba(0, 118, 182, 0.915)",
    text: "#caf0f8",
    hoverText: "#f48c06",
    hoverBorder: "#90e0ef",
    hoverBackground: "#00b4d8",
  },
  "tokyo-night": {
    background: "rgba(26, 32, 44, 0.915)",
    text: "#edf2f7",
    hoverText: "#f56565",
    hoverBorder: "#2d3748",
    hoverBackground: "#f56565",
  },
};

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeColors: ThemeColors;
}
interface ThemeProviderProps {
  children: React.ReactNode;
}

export const getLinearGradient = (currentTheme: Theme) => {
  switch (currentTheme) {
    case "tokyo-night":
      return "linear-gradient(305deg,rgba(245, 101, 101, 0.3) 45%,  rgba(22, 27, 37, 0.3)50%)";
    case "dark":
      return "linear-gradient(305deg,rgba(96, 50, 203, 0.3) 30%,  rgba(49, 69, 98, 0.3)70%)";
    case "ocean-blue":
      return "linear-gradient(305deg,rgba(0, 31, 41, 0.3)  45%, rgba(0, 140, 169, 0.3) 50%)";
    default:
      return "linear-gradient(305deg,rgba(153, 153, 153, 0.3) 45%,  rgba(121, 246, 202, 0.271)50%)";
  }
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  themeColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.remove(
      "dark",
      "ocean-blue",
      "tokyo-night"
    );
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
// export const mainStyles = {
//   light: "bg-light text-light",
//   dark: "bg-dark text-dark",
//   "ocean-blue": "bg-ocean-blue text-ocean-blue",
//   "tokyo-night": "bg-tokyo-night text-tokyo-night",
// };
// export const TextStyles = {
//   light: "text-light",
//   dark: "text-dark",
//   "ocean-blue": "text-ocean-blue",
//   "tokyo-night": "text-tokyo-night",
// };
// export const backgroundStyles = {
//   light: "bg-light",
//   dark: "bg-dark",
//   "ocean-blue": "bg-ocean-blue",
//   "tokyo-night": "bg-tokyo-night",
// };
// export const buttonStyles = {
//   light: "bg-light text-light",
//   dark: "bg-dark text-dark",
//   "ocean-blue": "bg-ocean-blue text-ocean-blue",
//   "tokyo-night": "bg-tokyo-night text-tokyo-night",
// };
// export const buttonHoverStyles = {
//   light: "hover:bg-light-primary",
//   dark: "hover:bg-dark-primary",
//   "ocean-blue": "hover:bg-ocean-blue-primary",
//   "tokyo-night": "hover:bg-tokyo-night-primary",
// };
// export const borderStyles = {
//   light: "border-light",
//   dark: "border-dark",
//   "ocean-blue": "border-ocean-blue",
//   "tokyo-night": "border-tokyo-night",
// };
