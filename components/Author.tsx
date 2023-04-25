import { Author } from "@/interface";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
interface AuthorProps {
  authors: Author[];
}

const Author: React.FC<AuthorProps> = ({ authors }) => {
  const { theme, themeColors } = useTheme();
  // const [isHovered, setIsHovered] = useState(false);
  const { background } = themeColors[theme];
  const backGroundStyle = useMemo(
    () => ({
      backgroundColor: background,
    }),
    [background]
  );
  const author = authors[0];
  return (
    <div
      style={backGroundStyle}
      className="relative text-center sm:text-start mt-20 mb-8 p-12 rounded-lg bg-opacity-20"
    >
      <div className=" absolute left-4 right-0 -top-14">
        <Image
          className=" align-middle rounded-full"
          src={author.photo.url}
          alt={author.name}
          width={100}
          height={100}
          quality={100}
        ></Image>
      </div>
      <h3 className=" my-4 text-2xl font-bold">{author.name}</h3>
      <p className="text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
