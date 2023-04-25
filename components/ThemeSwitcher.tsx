import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme, Theme } from "../contexts/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, themeColors } = useTheme();
  const { background, text, hoverBorder, hoverBackground } = themeColors[theme];
  const [isOpen, setIsOpen] = useState(false);
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as Theme);
    setIsOpen(false);
  };
  const containerStyle = {
    backgroundColor: background,
    color: text,
    outline: "1px solid transparent",
    transition:
      "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
  };
  const handleMouseEnter = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement
    >
  ) => {
    event.currentTarget.style.outlineColor = hoverBorder;
    event.currentTarget.style.backgroundColor = hoverBackground;
  };

  const handleMouseLeave = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement
    >
  ) => {
    event.currentTarget.style.backgroundColor = background;
    event.currentTarget.style.outlineColor = "transparent";
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="relative font-medium inline-block rounded md:float-right mt-2 align-middle ml-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`p-2 rounded  transition ease-in-out 
        focus:ring-2 focus:ring-offset-2 focus:outline-none`}
      >
        Theme Mode
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            style={containerStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variants={dropdownVariants}
            className={`absolute rounded z-10 mt-2  border shadow`}
          >
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-2 cursor-pointer  }`}
              onClick={() => handleThemeChange("light")}
            >
              Light
            </li>
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-2 cursor-pointer `}
              onClick={() => handleThemeChange("dark")}
            >
              Dark
            </li>
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-2 cursor-pointer `}
              onClick={() => handleThemeChange("ocean-blue")}
            >
              Ocean Blue
            </li>
            <li
              style={containerStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-2 cursor-pointer `}
              onClick={() => handleThemeChange("tokyo-night")}
            >
              Tokyo Night
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
