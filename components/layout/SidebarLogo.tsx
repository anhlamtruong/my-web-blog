import React from "react";
import { useRouter } from "next/router";
import { MdMotionPhotosOn } from "react-icons/md";
import { useStyles } from "@/hooks/useStyles";
import ThemeTextHover from "./ThemeTextHover";
import Link from "next/link";

const SidebarLogo = () => {
  const router = useRouter();
  const styles = useStyles();

  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full items-start justify-start
    hover:bg-opacity-10 cursor-pointer transition gap-4 pl-4 pt-4  "
    >
      <ThemeTextHover>
        <div className="flex flex-row">
          <div className="">
            <Link href="/">
              <span
                style={styles.textPrimary}
                className={`cursor-pointer font-bold lg:text-4xl text-xl`}
              >
                Creata
              </span>
            </Link>
          </div>
          <MdMotionPhotosOn className="" size={28}></MdMotionPhotosOn>
        </div>
      </ThemeTextHover>
    </div>
  );
};

export default SidebarLogo;
