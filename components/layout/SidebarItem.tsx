import React, { useCallback, useMemo, useState } from "react";
import { IconType } from "react-icons";
import { useTheme } from "@/contexts/ThemeContext";
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
}) => {
  const [isHoveredSidebarItem, setIsHoveredSidebarItem] = useState(false);
  const { theme, themeColors } = useTheme();
  const { textPrimary, backgroundSecondary, hoverText } = themeColors[theme];
  const sidebarItemStyle = useMemo(
    () => ({
      backgroundColor: "transparent",
      color: isHoveredSidebarItem ? hoverText : textPrimary,
    }),
    [textPrimary, hoverText, isHoveredSidebarItem]
  );
  const handleMouseEnterSidebarItem = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHoveredSidebarItem(true);
      event.currentTarget.style.backgroundColor = backgroundSecondary;
    },
    [backgroundSecondary]
  );
  const handleMouseLeaveSidebarItem = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHoveredSidebarItem(false);
      event.currentTarget.style.backgroundColor = "transparent";
    },
    []
  );
  return (
    <div className="flex flex-row items-center">
      <div
        style={sidebarItemStyle}
        onMouseEnter={handleMouseEnterSidebarItem}
        onMouseLeave={handleMouseLeaveSidebarItem}
        className=" relative rounded-md h-14 w-14 ml-2
      flex items-center justify-center p-4 hover:bg-opacity-10 cursor-pointer lg:hidden  themed-text"
      >
        <Icon size={28} />
      </div>
      <div
        style={sidebarItemStyle}
        onMouseEnter={handleMouseEnterSidebarItem}
        onMouseLeave={handleMouseLeaveSidebarItem}
        className=" relative hidden lg:flex ml-2
      items-center gap-4 p-4 rounded-md hover:bg-opacity-10 cursor-pointer themed-text"
      >
        <Icon size={28} />
        <p className="hidden lg:block text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
