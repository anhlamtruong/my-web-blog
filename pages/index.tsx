import Head from "next/head";
import { getPosts } from "@/services";
import { useTheme } from "../contexts/ThemeContext";
import { Post } from "@/interface";
import { PostCard, Categories, PostWidget } from "@/components";
import { NextPageContext } from "next";
import { useStyles } from "@/hooks/useStyles";
export async function getServerSideProps(context: NextPageContext) {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  const styles = useStyles();

  return (
    <>
      <div
        style={styles.textPrimary}
        className={`container mx-auto px-10 themed-text `}
      >
        <Head>
          <title>Anh Blog</title>
          <link rel="icon" href="../public/favicon.ico" />
        </Head>

        <div className="">
          {posts.map((node, index) => (
            <PostCard node={node} key={node.node.id} />
          ))}
        </div>
      </div>
    </>
  );
}
