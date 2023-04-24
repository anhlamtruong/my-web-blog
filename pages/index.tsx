import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import classNames from "classnames";

import { useTheme } from "../contexts/ThemeContext";

import {
  PostCard,
  ThemeSwitcher,
  Categories,
  PostWidget,
  BackgroundGradient,
} from "@/components";
import { useEffect, useState } from "react";

const posts = [
  { title: "React Testing", excerpt: "Learn React Testing", uid: 1231234 },
  {
    title: "React Testing 2",
    excerpt: "Learn React Testing love",
    uid: 123412,
  },
];

export default function Home() {
  const { theme, themeColors } = useTheme();
  const { background, text, hoverBorder, hoverBackground } = themeColors[theme];
  const containerStyle = {
    backgroundColor: background,
    color: text,
  };
  return (
    <div style={containerStyle} className={`container mx-auto px-10 mb-8`}>
      <Head>
        <title>Anh Blog</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>

      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
        <div className=" lg:col-span-4 col-span-1">
          <div className=" lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  );
}
