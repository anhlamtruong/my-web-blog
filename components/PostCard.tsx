import React from "react";
import { Post } from "@/interface";
interface PostCardProps {
  post: Post;
}
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
};

export default PostCard;
