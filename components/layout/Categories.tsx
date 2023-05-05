import { useTheme } from "@/contexts/ThemeContext";
import { Categories } from "../../interface";
import React, { useState, useEffect } from "react";
import { getCategories } from "@/services";
import Link from "next/link";
import { useStyles } from "@/hooks/useStyles";

const Categories = () => {
  const [categories, setCategories] = useState<Categories[] | []>([]);
  const { theme, themeColors } = useTheme();
  const styles = useStyles();

  const { textPrimary, hoverText } = themeColors[theme];

  const handleMouseEnter = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement
    >
  ) => {
    event.currentTarget.style.color = hoverText;
  };

  const handleMouseLeave = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement
    >
  ) => {
    event.currentTarget.style.color = textPrimary;
  };
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div style={styles.container} className=" shadow-lg rounded-lg p-8 mb-8">
      <h3 className=" text-xl mb-6 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span
            style={styles.textPrimary}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=" cursor-pointer block pb-3 mb-3 themed-text"
          >
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
