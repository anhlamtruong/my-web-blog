import { useTheme } from "@/contexts/ThemeContext";
import { RelatedPosts, SimilarPosts } from "../../interface";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import { getRecentPosts, getSimilarPosts } from "@/services";
import Link from "next/link";
import { useStyles } from "@/hooks/useStyles";

interface PostWidgetProps {
  categories: string[];
  slug?: string;
}
const PostWidget: React.FC<PostWidgetProps> = ({ categories, slug }) => {
  const [relatePosts, setRelatePosts] = useState<
    RelatedPosts[] | SimilarPosts[] | []
  >([]);
  const { theme, themeColors } = useTheme();
  const styles = useStyles();
  const { textPrimary, hoverText } = themeColors[theme];

  const handleMouseEnter = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement | HTMLAnchorElement
    >
  ) => {
    event.currentTarget.style.color = hoverText;
  };

  const handleMouseLeave = (
    event: React.MouseEvent<
      HTMLUListElement | HTMLLIElement | HTMLButtonElement | HTMLAnchorElement
    >
  ) => {
    event.currentTarget.style.color = textPrimary;
  };
  useEffect(() => {
    if (slug) {
      getSimilarPosts(["haa", "asdfasdf"], slug).then((result) =>
        setRelatePosts(result)
      );
    } else {
      // console.log("FIRE");
      getRecentPosts().then((result) => setRelatePosts(result));
    }
  }, [categories, slug]);

  // console.log(relatePosts);

  return (
    <div style={styles.container} className=" shadow-lg rounded-lg p-8 mb-8">
      <h3 className=" text-xl mb-6 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatePosts.map((post) => (
        <div
          key={post.title}
          className="flex items-center w-full mb-4 border-b pb-3"
        >
          <div className="w-16 flex-none ">
            <Image
              className=" align-middle rounded-full"
              src={post.featuredImage.url}
              alt={post.title}
              width={100}
              height={100}
              quality={100}
            ></Image>
          </div>
          <div className="flex-grow ml-4 ">
            <p className="font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              style={styles.textPrimary}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className=" text-xs themed-text"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
