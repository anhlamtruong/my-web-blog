import { Author } from "@/interface";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useTheme } from "@/contexts/ThemeContext";
import styles from "../styles/CommentsForm.module.css";
import { submitComment } from "../services";
interface CommentsFormProps {
  slug: string;
}
interface FormData {
  name: string;
  email: string;
  comment?: string;
  storeData: boolean;
}

const CommentsForm: React.FC<CommentsFormProps> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [localStorage, setLocalStorage] = useState<Storage | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    comment: "",
    storeData: false,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailedMessage, setShowFailedMessage] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement | null>(null);
  const nameEl = useRef<HTMLInputElement | null>(null);
  const emailEl = useRef<HTMLInputElement | null>(null);
  const storeDataEl = useRef<HTMLInputElement | null>(null);
  const { theme, themeColors } = useTheme();
  const { backgroundPrimary, textPrimary, hoverBorder, hoverText } =
    themeColors[theme];

  const buttonStyle = useMemo(
    () => ({
      backgroundColor: backgroundPrimary,
      color: isHovered ? hoverText : textPrimary,
      outline: "1px solid transparent",
    }),
    [backgroundPrimary, textPrimary, hoverText, isHovered]
  );
  const handleMouseEnterButton = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHovered(true);
      event.currentTarget.style.outlineColor = "transparent";
      event.currentTarget.style.backgroundColor = hoverBorder;
    },
    [hoverBorder]
  );

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  }, []);
  const handleMouseLeaveButton = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      setIsHovered(false);
      event.currentTarget.style.backgroundColor = backgroundPrimary;
      event.currentTarget.style.outlineColor = hoverBorder;
    },
    [backgroundPrimary, hoverBorder]
  );
  const CommentFormStyle = useMemo(
    () => ({
      backgroundColor: backgroundPrimary,
      text: textPrimary,
      borderColor: hoverBorder,
      outline: "1px solid transparent",
      transition:
        "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
    }),
    [backgroundPrimary, textPrimary, hoverBorder]
  );

  const textAreaStyle = useMemo(
    () => ({
      backgroundColor: backgroundPrimary,
      color: textPrimary,
      borderColor: textPrimary,
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
        borderColor: textPrimary,
        color: textPrimary,
        backgroundColor: hoverText,
      },
    }),
    [backgroundPrimary, textPrimary, hoverText]
  );
  const ErrorStyle = useMemo(
    () => ({
      color: hoverText,
      transition:
        "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
      // "--background-color": background,
      // "--text-color": text,
      // "--border-color": hoverBorder,
      // "--placeholder-color": hoverBorder,
    }),
    [hoverText]
  );
  const LabelStyle = useMemo(
    () => ({
      color: hoverBorder,
      transition:
        "background-color 200ms ease, border-color 200ms ease, border-width 200ms ease",
      // "--background-color": background,
      // "--text-color": text,
      // "--border-color": hoverBorder,
      // "--placeholder-color": hoverBorder,
    }),
    [hoverBorder]
  );

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormData = {
      name: window.localStorage.getItem("name") || "",
      email: window.localStorage.getItem("email") || "",
      storeData: !!(
        window.localStorage.getItem("name") ||
        window.localStorage.getItem("email")
      ),
    };
    setFormData(initialFormData);
  }, []);

  const handleCommentSubmission = useCallback(async () => {
    setError(false);
    if (!commentEl.current || !nameEl.current || !emailEl.current) {
      setError(true);
      return;
    }
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };
    if (storeDataEl.current?.checked) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }
    const result = await submitComment(commentObj);
    if (result.success) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      setShowFailedMessage(true);
      setTimeout(() => setShowFailedMessage(false), 3000);
    }
  }, [slug]);

  return (
    <div
      style={CommentFormStyle}
      className=" shadow-lg rounded-lg p-8 pb-12 mb-8"
    >
      <h3 className=" text-xl mb-8 font-semibold border-b pb-4">
        Leave a comment
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
          value={formData.name}
          onChange={onInputChange}
          className={` ${styles.textarea} p-4 outline-none w-full rounded-lg`}
          placeholder="Name"
          name="name"
        />
        <input
          style={textAreaStyle}
          type="email"
          ref={emailEl}
          onChange={onInputChange}
          className={` ${styles.textarea} p-4 outline-none w-full rounded-lg`}
          placeholder="Email"
          name="email"
        />
      </div>
      <div className=" grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            onChange={onInputChange}
            id="storeData"
            name="storeData"
            value="true"
            className="mr-2 transform translate-y-[1.5px]"
          />
          <label
            style={LabelStyle}
            className=" cursor-pointer"
            htmlFor="storeData"
          >
            Save my email and name for the next time I comment
          </label>
        </div>
      </div>
      {error && (
        <p style={ErrorStyle} className="text-xs">
          All fields are required.
        </p>
      )}
      <div className=" flex flex-col mt-8 justify-center">
        <button
          style={buttonStyle}
          onMouseEnter={handleMouseEnterButton}
          onMouseLeave={handleMouseLeaveButton}
          type="button"
          className="themed-text transform hover:-translate-y-1 inline-block font-medium
            rounded-2xl px-6 py-3 cursor-pointer text-lg"
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className=" text-xl float-right font-semibold mt-3 text-green-500">
            Comment Submitted for review
          </span>
        )}
        {showFailedMessage && (
          <span className=" text-xl float-right font-semibold mt-3 text-red-500">
            Comment Failed to Submit
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
