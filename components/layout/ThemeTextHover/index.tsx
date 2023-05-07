import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
interface ThemedTextHoverProps {
  children: React.ReactNode;
  onClick?: () => void;
}
const ThemeTextHover: React.FC<ThemedTextHoverProps> = ({
  children,
  onClick,
}) => {
  const { themeColors, theme } = useTheme();
  const { textPrimary, hoverText } = themeColors[theme];

  const textStyle = useMemo(() => {
    const baseStyle = {
      color: textPrimary,
      cursor: "pointer",
      transition: "color 0.1s ease-in",
    };

    const hoverStyle = {
      color: hoverText,
    };

    return { baseStyle, hoverStyle };
  }, [textPrimary, hoverText]);
  const [style, setStyle] = useState(textStyle.baseStyle);

  useEffect(() => {
    setStyle((prevState) => ({
      ...prevState,
      color: textStyle.baseStyle.color,
    }));
  }, [textStyle.baseStyle.color]);

  const handleMouseEnter = useCallback(() => {
    setStyle({ ...textStyle.baseStyle, ...textStyle.hoverStyle });
  }, [textStyle.baseStyle, textStyle.hoverStyle]);

  const handleMouseLeave = useCallback(() => {
    setStyle(textStyle.baseStyle);
  }, [textStyle.baseStyle]);

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
export default ThemeTextHover;
