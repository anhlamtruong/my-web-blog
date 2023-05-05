import React from "react";
import { useRouter } from "next/router";
import { MdMotionPhotosOn } from "react-icons/md";
import { useStyles } from "@/hooks/useStyles";
import ThemeTextHover from "./ThemeTextHover";

const SidebarLogo = () => {
  const router = useRouter();
  const styles = useStyles();

  return (
    <div
      className="rounded-full h-14 w-14 p-4 flex items-center
   justify-center hover:bg-opacity-10 cursor-pointer transition"
    >
      <ThemeTextHover>
        <MdMotionPhotosOn size={28}></MdMotionPhotosOn>
      </ThemeTextHover>
    </div>
  );
};

export default SidebarLogo;
