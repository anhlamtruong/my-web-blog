import Head from "next/head";
import { getPosts } from "@/services";
import { useTheme } from "../contexts/ThemeContext";
import { Post } from "@/interface";
import { PostCard, Categories, PostWidget } from "@/components";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const posts = (await getPosts()) || [];
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: { posts },
  };
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  const { theme, themeColors } = useTheme();
  // console.log(posts);
  const { text } = themeColors[theme];
  const containerStyle = {
    color: text,
  };
  return (
    <div
      style={containerStyle}
      className={`container mx-auto px-10 themed-text `}
    >
      <Head>
        <title>Anh Blog</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>

      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((node, index) => (
            <PostCard node={node} key={node.node.id} />
          ))}
        </div>
        <div className=" lg:col-span-4 col-span-1">
          <div className=" lg:sticky relative top-8">
            <PostWidget categories={["test"]} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
