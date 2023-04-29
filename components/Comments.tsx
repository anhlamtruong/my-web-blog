import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import moment from "moment";
import parse from "html-react-parser";
import { useTheme } from "@/contexts/ThemeContext";
import { getComments } from "@/services";
import { Comment } from "../interface";
interface CommentsProps {
  slug: string;
}
const Comments: React.FC<CommentsProps> = ({ slug }) => {
  const [comment, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    // console.log(slug);
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, [slug]);
  return (
    <div>
      {comment.length > 0 && (
        <div className=" shadow-lg rounded-lg p-8 pd-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pd-4">
            {comment.length} Comments
          </h3>
          {comment.map((comment) => (
            <div key={comment.createdAt} className="border-b mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="whitespace-pre-line w-full">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
