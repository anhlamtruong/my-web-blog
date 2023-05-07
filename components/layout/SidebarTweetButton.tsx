import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";
import ThemeTextHover from "./ThemeTextHover";
import { useTheme } from "@/contexts/ThemeContext";

const SidebarTweetButton = () => {
  const router = useRouter();
  const [isHoveredSidebarItem, setIsHoveredSidebarItem] = useState(false);
  const { theme, themeColors } = useTheme();
  const { textPrimary, backgroundSecondary, hoverText, hoverBackground } =
    themeColors[theme];
  const sidebarItemStyle = useMemo(
    () => ({
      backgroundColor: backgroundSecondary,
      color: isHoveredSidebarItem ? textPrimary : hoverText,
    }),
    [textPrimary, hoverText, isHoveredSidebarItem, backgroundSecondary]
  );
  const handleMouseEnterSidebarItem = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHoveredSidebarItem(true);
      event.currentTarget.style.backgroundColor = hoverBackground;
    },
    [hoverBackground]
  );
  const handleMouseLeaveSidebarItem = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHoveredSidebarItem(false);
      event.currentTarget.style.backgroundColor = backgroundSecondary;
    },
    [backgroundSecondary]
  );
  return (
    <div onClick={() => router.push("/")} className="">
      <div
        style={sidebarItemStyle}
        onMouseEnter={handleMouseEnterSidebarItem}
        onMouseLeave={handleMouseLeaveSidebarItem}
        className="  ml-2 lg:hidden rounded-full  w-14 p-4 flex items-center justify-center
        cursor-pointer themed-text"
      >
        <FaFeather size={24} />
      </div>
      <div
        style={sidebarItemStyle}
        onMouseEnter={handleMouseEnterSidebarItem}
        onMouseLeave={handleMouseLeaveSidebarItem}
        className="  ml-2 hidden lg:flex lg:gap-4 rounded-md px-4 py-4 items-center justify-center
        cursor-pointer transition themed-text"
      >
        <FaFeather size={24} />
        <p className="hidden lg:block text-center font-semibold text-xl">
          Write Post
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
