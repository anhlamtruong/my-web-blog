import React, { useCallback, useMemo, useState } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interface";
import { useTheme } from "@/contexts/ThemeContext";
import { AiOutlineCalendar } from "react-icons/ai";
interface PostCardProps {
  node: Post;
}

const PostCard: React.FC<PostCardProps> = ({ node }) => {
  const { theme, themeColors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const { node: post } = node;
  const { background, text, hoverText, hoverBorder } = themeColors[theme];
  const containerStyle = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );
  const buttonStyle = useMemo(
    () => ({
      backgroundColor: background,
      color: isHovered ? hoverText : text,
      outline: "1px solid transparent",
    }),
    [background, text, hoverText, isHovered]
  );
  const handleMouseEnterText = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeaveText = useCallback(() => {
    setIsHovered(false);
  }, []);

  const textStyle = useMemo(
    () => ({
      color: isHovered ? hoverText : text,
    }),
    [text, hoverText, isHovered]
  );

  const handleMouseEnterButton = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.currentTarget.style.outlineColor = "transparent";
      event.currentTarget.style.backgroundColor = hoverBorder;
    },
    [hoverBorder]
  );

  const handleMouseLeaveButton = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.currentTarget.style.backgroundColor = background;
      event.currentTarget.style.outlineColor = hoverBorder;
    },
    [background, hoverBorder]
  );

  return (
    <div
      onMouseEnter={handleMouseEnterText}
      onMouseLeave={handleMouseLeaveText}
      style={containerStyle}
      className="group shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8"
    >
      <div className=" relative overflow-hidden shadow-md pd-80 mb-6">
        <Image
          className=" object-top  h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          src={post.featuredImage.url}
          alt={post.title}
          width={100}
          height={100}
          quality={100}
        ></Image>
      </div>
      <h1
        style={textStyle}
        className="themed-text text-center mb-6 cursor-pointer
       text-3xl font-semibold "
      >
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full ">
        {post.authors.map((author) => (
          <div key={author.id} className="lg:flex lg:justify-between">
            <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 ">
              <Image
                className=" align-middle rounded-full"
                src={author.photo.url}
                alt={author.name}
                width={30}
                height={30}
                quality={100}
              ></Image>
              <p className=" inline align-middle ml-2 text-lg ">
                {author.name}
              </p>
            </div>
            <div className="font-medium">
              <AiOutlineCalendar className="h-6 w-6 inline mr-2" />
              <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
            </div>
          </div>
        ))}
      </div>
      <p className=" text-center text-lg font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span
            style={buttonStyle}
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveButton}
            className="themed-text transform hover:-translate-y-1 inline-block font-medium
           rounded-md px-6 py-3 cursor-pointer text-lg"
          >
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
