import React, { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { BsChevronDown } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
const Header = () => {
  const { theme, themeColors } = useTheme();
  const { text, hoverBorder } = themeColors[theme];
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const textStyle = {
    color: text,
  };
  const borderStyle = {
    borderStyle: "solid",
    borderColor: hoverBorder,
  };
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
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
      <div
        onClick={() => toggleAccountMenu()}
        className="flex flex-row items-center gap-2 relative cursor-pointer"
      >
        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
          <Image
            src="/my-web-blog/public/dummy-avatar.png"
            alt="profile avatar"
            width={100}
            height={100}
            quality={100}
            className=" w-full h-auto hover:filter hover:hue-rotate-30 transition-all duration-100 ease-in"
          />
        </div>
        <BsChevronDown
          className={` text-white transition ${
            showAccountMenu ? "rotate-180" : "rotate-0"
          }`}
        />
        <AccountMenu isOpen={showAccountMenu} />
      </div>
    </div>
  );
};

export default Header;
