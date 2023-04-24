import { useTheme, mainStyles } from "@/contexts/ThemeContext";
import React from "react";

const PostWidget = () => {
  const { theme, setTheme } = useTheme();
  return <div className={`${mainStyles[theme]}`}>PostWidget</div>;
};

export default PostWidget;
