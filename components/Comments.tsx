import { Author } from "@/interface";
import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
interface CommentsProps {
  slug: string;
}
const Comments: React.FC<CommentsProps> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();
  return (
    <div className=" shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h1>Comment</h1>
    </div>
  );
};

export default Comments;
