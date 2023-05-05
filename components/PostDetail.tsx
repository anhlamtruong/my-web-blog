import React, { useCallback } from "react";
import moment from "moment";

import Image from "next/image";
import { PostDetails, ContentType, NodeType } from "@/interface";

import { AiOutlineCalendar } from "react-icons/ai";
import { useStyles } from "@/hooks/useStyles";
interface PostDetailsProps {
  post: PostDetails;
}
type ContentFragmentType = string | JSX.Element | JSX.Element[] | undefined;

const PostDetail: React.FC<PostDetailsProps> = ({ post }) => {
  const styles = useStyles();

  const getContentFragment = useCallback(
    (
      index: number,
      content: ContentFragmentType,

      obj?: ContentType,
      type?: string
    ) => {
      let modifiedContent: ContentFragmentType = content;

      if (obj) {
        if (obj.bold) {
          modifiedContent = <b key={index}>{content}</b>;
        }

        if (obj.italic) {
          modifiedContent = <em key={index}>{content}</em>;
        }

        if (obj.underline) {
          modifiedContent = <u key={index}>{content}</u>;
        }
        switch (type) {
          case "heading-three":
            return (
              <h3 key={index} className="text-xl font-semibold mb-4">
                {modifiedContent as JSX.Element}
              </h3>
            );
          case "paragraph":
            return (
              <p key={index} className="mb-8">
                {modifiedContent as JSX.Element}
              </p>
            );
          case "heading-four":
            return (
              <h4 key={index} className="text-md font-semibold mb-4">
                {modifiedContent as JSX.Element}
              </h4>
            );
          case "image":
            return (
              <Image
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          default:
            return modifiedContent as ContentFragmentType;
        }
      }
    },
    []
  );
  const returnContentFragment = useCallback(
    (content: NodeType[]) => {
      return content.map((typeObj, index) => {
        const children = typeObj.children.map((item, itemIndex) =>
          getContentFragment(itemIndex, item.text, item)
        );
        return children.map((contFrag, index) => {
          return getContentFragment(
            index,
            contFrag,
            typeObj.children[index],
            typeObj.type
          );
        });
      });
    },
    [getContentFragment]
  );
  return (
    <div
      style={styles.container}
      className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8"
    >
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          className=" object-top h-full w-full rounded-t-lg"
          src={post.featuredImage.url}
          alt={post.title}
          width={100}
          height={100}
          quality={100}
        ></Image>
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          {post.authors.map((author) => (
            <div
              key={author.id}
              className="lg:flex lg:justify-between lg:flex-row"
            >
              <div className="flex mb-4 lg:mb-0 w-full lg:w-auto mr-8 ">
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
        <h1 className=" mb-8 text-3xl font-semibold">{post.title}</h1>
        {returnContentFragment(post.content.raw.children)}
      </div>
    </div>
  );
};

export default PostDetail;
