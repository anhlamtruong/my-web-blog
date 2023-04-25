import { Author } from "@/interface";
import React, { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "../styles/CommentsForm.module.css";
interface CommentsFormProps {
  slug: string;
}
const CommentsForm: React.FC<CommentsFormProps> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement | null>(null);
  const nameEl = useRef<HTMLInputElement | null>(null);
  const emailEl = useRef<HTMLInputElement | null>(null);
  const storeDataEl = useRef<HTMLInputElement | null>(null);
  const { theme, themeColors } = useTheme();
  const { background, text, hoverBorder, hoverText, hoverBackground } =
    themeColors[theme];

  const buttonStyle = useMemo(
    () => ({
      backgroundColor: background,
      color: isHovered ? hoverText : text,
      outline: "1px solid transparent",
    }),
    [background, text, hoverText, isHovered]
  );
  const handleMouseEnterButton = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHovered(true);
      event.currentTarget.style.outlineColor = "transparent";
      event.currentTarget.style.backgroundColor = hoverBorder;
    },
    [hoverBorder]
  );

  const handleMouseLeaveButton = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHovered(false);
      event.currentTarget.style.backgroundColor = background;
      event.currentTarget.style.outlineColor = hoverBorder;
    },
    [background, hoverBorder]
  );
  const CommentFormStyle = useMemo(
    () => ({
      backgroundColor: background,
      text: text,
      borderColor: hoverBorder,
      outline: "1px solid transparent",
      transition:
        "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
    }),
    [background, text, hoverBorder]
  );

  const textAreaStyle = useMemo(
    () => ({
      backgroundColor: background,
      color: text,
      borderColor: text,
      outline: "1px solid transparent",
      transition:
        "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
      // "--background-color": background,
      // "--text-color": text,
      // "--border-color": hoverBorder,
      // "--placeholder-color": hoverBorder,
      "&:focus": {
        // "--background-color": hoverBackground,
        // "--text-color": hoverText,
        // "--border-color": hoverText,
        borderColor: text,
        color: text,
        backgroundColor: hoverText,
      },
    }),
    [background, text, hoverText]
  );
  const ErrorStyle = useMemo(
    () => ({
      color: hoverBackground,
      transition:
        "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
      // "--background-color": background,
      // "--text-color": text,
      // "--border-color": hoverBorder,
      // "--placeholder-color": hoverBorder,
    }),
    [hoverBackground]
  );
  const handleCommentSubmission = useCallback(() => {}, []);

  return (
    <div
      style={CommentFormStyle}
      className=" shadow-lg rounded-lg p-8 pb-12 mb-8"
    >
      <h3 className=" text-xl mb-8 font-semibold border-b pb-4">
        Comments Form
      </h3>
      <div className=" grid grid-cols-1 gap-4 mb-4">
        <textarea
          style={textAreaStyle}
          ref={commentEl}
          className={` ${styles.textarea} p-4 outline-none w-full rounded-lg`}
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          style={textAreaStyle}
          type="text"
          ref={nameEl}
          className={` ${styles.textarea} p-4 outline-none w-full rounded-lg`}
          placeholder="Name"
          name="name"
        />
        <input
          style={textAreaStyle}
          type="email"
          ref={emailEl}
          className={` ${styles.textarea} p-4 outline-none w-full rounded-lg`}
          placeholder="Email"
          name="email"
        />
      </div>

      {error && (
        <p style={ErrorStyle} className="text-xs">
          All fields are required.
        </p>
      )}
      <div className=" flex mt-8 justify-center">
        <button
          style={buttonStyle}
          onMouseEnter={handleMouseEnterButton}
          onMouseLeave={handleMouseLeaveButton}
          type="button"
          className="themed-text transform hover:-translate-y-1 inline-block font-medium
           rounded-md px-6 py-3 cursor-pointer text-lg"
          onClick={handleCommentSubmission}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentsForm;
