import React, { useContext } from "react";
import Link from "next/link";
import { useTheme, borderStyles, TextStyles } from "../contexts/ThemeContext";

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
    <div className="container mx-auto px-10 mb-8">
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
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span
                style={textStyle}
                className={`md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer`}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
