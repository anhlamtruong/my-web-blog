import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, FC } from "react";
interface Props {
  children: ReactNode;
  show: boolean;
}
const ZoomOutFadeIn: FC<Props> = ({ children, show }) => {
  const variants = {
    hidden: { opacity: 1, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1 },
    exit: {
      opacity: 0,
      scaleX: 0,
      transition: {
        duration: 0.3,
        times: [0, 0.5, 1],
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const showTransition = {
    duration: 0.3,
    times: [0, 0.5, 1],
    ease: [0.215, 0.61, 0.355, 1], // cubic-bezier curve
  };

  const hideTransition = {
    duration: 0.3,
    times: [0, 0.5, 1],
    ease: [0.755, 0.05, 0.855, 0.06], // cubic-bezier curve
  };

  return (
    <>
      <AnimatePresence initial={true} mode="wait">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={show ? showTransition : hideTransition}
          className="w-full origin-left"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ZoomOutFadeIn;
