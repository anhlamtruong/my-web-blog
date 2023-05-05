import React from "react";
import { getPosts, getPostsDetails } from "../../services";
//getPostsDetails
import {
  Categories,
  PostWidget,
  PostDetail,
  Author,
  Comments,
  CommentsForm,
} from "../../components";
import { PostDetails } from "@/interface";
import { GetStaticPropsContext } from "next";
import { useStyles } from "@/hooks/useStyles";
//PostDetail, Author, Comments, CommentsForm
interface PostWidgetProps {
  post: PostDetails;
}

const PostDetails: React.FC<PostWidgetProps> = ({ post }) => {
  // console.log(post);
  const styles = useStyles();
  return (
    <div
      style={styles.textPrimary}
      className="container mx-auto px-10 themed-text"
    >
      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          <PostDetail post={post}></PostDetail>
          <Author authors={post.authors}></Author>
          <CommentsForm slug={post.slug}></CommentsForm>
          <Comments slug={post.slug}></Comments>
        </div>
        <div className=" lg:col-span-4 col-span-1">
          <div className=" lg:sticky relative top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const data = await getPostsDetails(slug);
  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
