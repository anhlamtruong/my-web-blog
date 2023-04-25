import React from "react";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";

const categories = [
  { name: "React", slug: "react" },
  { name: "Web Development", slug: "web-dev" },
];
const Header = () => {
  const { theme, themeColors } = useTheme();
  const { text, hoverBorder } = themeColors[theme];

  const textStyle = {
    color: text,
  };
  const borderStyle = {
    borderStyle: "solid",
    borderColor: hoverBorder,
  };
  return (
    <div className="container mx-auto px-10 mb-8 themed-background">
      <div
        style={borderStyle}
        className={` border-b w-full inline-block  py-8`}
      >
        <div className="md:float-left block">
          <Link href="/">
            <span
              style={textStyle}
              className={`cursor-pointer font-bold text-4xl `}
            >
              GraphCMS
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header;
