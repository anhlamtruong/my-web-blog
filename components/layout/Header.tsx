import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeSwitcher from "../ThemeSwitcher";
import { useAuth } from "../../contexts/AuthContext";

import { BsChevronDown } from "react-icons/bs";
import AccountMenu from "../AccountMenu";
import { useRouter } from "next/router";
import { useStyles } from "@/hooks/useStyles";

const Header = () => {
  const router = useRouter();
  const { theme, themeColors } = useTheme();
  const { textPrimary, hoverBorder, backgroundPrimary, hoverText } =
    themeColors[theme];
  const styles = useStyles();

  const [isHovered, setIsHovered] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  //*Style
  const { user, loading } = useAuth();
  const buttonStyle = useMemo(
    () => ({
      backgroundColor: backgroundPrimary,
      color: isHovered ? hoverText : textPrimary,
      outline: "1px solid transparent",
    }),
    [backgroundPrimary, textPrimary, hoverText, isHovered]
  );

  //*Event Handler
  const handleMouseEnterButton = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHovered(true);
      event.currentTarget.style.outlineColor = "transparent";
      event.currentTarget.style.backgroundColor = hoverBorder;
    },
    [hoverBorder]
  );
  const handleMouseLeaveButton = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHovered(false);
      event.currentTarget.style.backgroundColor = backgroundPrimary;
      event.currentTarget.style.outlineColor = hoverBorder;
    },
    [backgroundPrimary, hoverBorder]
  );
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <div className="flex flex-col mx-auto px-10 mb-8 themed-background z-20 ">
      <div className={`  w-full inline-block  items-center  py-8`}>
        <div className="block">
          <Link href="/">
            <span
              style={styles.textPrimary}
              className={`cursor-pointer font-bold text-4xl `}
            >
              Creata
            </span>
          </Link>
        </div>
        <div className="flex flex-col justify-end justify-items-start mt-2 items-start gap-4">
          <ThemeSwitcher />
          {user ? (
            <div
              onClick={() => toggleAccountMenu()}
              className="relative gap-1 flex justify-center items-center align-middle "
            >
              <div className=" items-center align-middle">
                <Image
                  src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="profile avatar"
                  width={100}
                  height={100}
                  quality={100}
                  className="rounded-full w-10 overflow-clip aspect-square hover:filter hover:hue-rotate-30 transition-all duration-100 ease-in"
                />
              </div>

              <AccountMenu isOpen={showAccountMenu} user={user} />
              <BsChevronDown
                className={` text-white transition  ${
                  showAccountMenu ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          ) : router.pathname !== "/auth" ? (
            <button
              style={buttonStyle}
              onMouseEnter={handleMouseEnterButton}
              onMouseLeave={handleMouseLeaveButton}
              type="button"
              onClick={() => router.push("/auth")}
              className="
            themed-text transform hover:-translate-y-1 inline-block font-medium
            rounded-md px-3 py-2 cursor-pointer text-lg"
            >
              Sign In
            </button>
          ) : (
            <button
              style={buttonStyle}
              onMouseEnter={handleMouseEnterButton}
              onMouseLeave={handleMouseLeaveButton}
              type="button"
              onClick={() => router.push("/")}
              className="
            themed-text transform hover:-translate-y-1 inline-block font-medium
            rounded-md px-3 py-2 cursor-pointer text-lg"
            >
              Home Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
