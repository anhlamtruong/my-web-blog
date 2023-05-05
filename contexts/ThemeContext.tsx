import React, { createContext, useContext, useEffect, useState } from "react";
export type Theme = "light" | "dark" | "ocean-blue" | "tokyo-night";

type ThemeColors = {
  [key in Theme]: {
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    backgroundPrimaryOpacity: string;
    backgroundSecondaryOpacity: string;
    backgroundTertiaryOpacity: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textTint: string;
    textShade: string;
    borderPrimary: string;
    borderSecondary: string;
    hoverText: string;
    hoverBorder: string;
    hoverBackground: string;
  };
};

const themeColors: ThemeColors = {
  light: {
    backgroundPrimary: "#f9fafb",
    backgroundSecondary: "#e5e7eb",
    backgroundTertiary: "#d1d5db",
    backgroundPrimaryOpacity: "rgba(249, 250, 251, 0.9)",
    backgroundSecondaryOpacity: "rgba(229, 231, 235, 0.9)",
    backgroundTertiaryOpacity: "rgba(209, 213, 219, 0.9)",
    textPrimary: "#1f2937",
    textSecondary: "#4b5563",
    textTertiary: "#9ca3af",
    textTint: "#d1d5db",
    textShade: "#6b7280",
    borderPrimary: "#e5e7eb",
    borderSecondary: "#d1d5db",
    hoverText: "#3b82f6",
    hoverBorder: "#010408",
    hoverBackground: "#3b82f6",
  },
  dark: {
    backgroundPrimary: "#1f2937",
    backgroundSecondary: "#4b5563",
    backgroundTertiary: "#6b7280",
    backgroundPrimaryOpacity: "rgba(31, 41, 55, 0.9)",
    backgroundSecondaryOpacity: "rgba(75, 85, 99, 0.9)",
    backgroundTertiaryOpacity: "rgba(107, 114, 128, 0.9)",
    textPrimary: "#f9fafb",
    textSecondary: "#d1d5db",
    textTertiary: "#9ca3af",
    textTint: "#6b7280",
    textShade: "#4b5563",
    borderPrimary: "#6b7280",
    borderSecondary: "#4b5563",
    hoverText: "#ec4899",
    hoverBorder: "#4b5563",
    hoverBackground: "#8b5cf6",
  },
  "ocean-blue": {
    backgroundPrimary: "#00b4d8",
    backgroundSecondary: "#48cae4",
    backgroundTertiary: "#90e0ef",
    backgroundPrimaryOpacity: "rgba(0, 180, 216, 0.9)",
    backgroundSecondaryOpacity: "rgba(72, 202, 228, 0.9)",
    backgroundTertiaryOpacity: "rgba(144, 224, 239, 0.9)",
    textPrimary: "#03045e",
    textSecondary: "#023e8a",
    textTertiary: "#0077b6",
    textTint: "#90e0ef",
    textShade: "#48cae4",
    borderPrimary: "#023e8a",
    borderSecondary: "#0077b6",
    hoverText: "#f48c06",
    hoverBorder: "#90e0ef",
    hoverBackground: "#00b4d8",
  },
  "tokyo-night": {
    backgroundPrimary: "#1a202c",
    backgroundSecondary: "#2d3748",
    backgroundTertiary: "#4a5568",
    backgroundPrimaryOpacity: "rgba(26, 32, 44, 0.9)",
    backgroundSecondaryOpacity: "rgba(45, 55, 72, 0.9)",
    backgroundTertiaryOpacity: "rgba(74, 85, 104, 0.9)",
    textPrimary: "#edf2f7",
    textSecondary: "#a0aec0",
    textTertiary: "#718096",
    textTint: "#e2e8f0",
    textShade: "#a0aec0",
    borderPrimary: "#4a5568",
    borderSecondary: "#2d3748",
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
