import { motion } from "framer-motion";
import { FC } from "react";

interface PropsExpandableDiv {
  children: React.ReactNode;
  expanded: boolean;
}

const ExpandableDiv: FC<PropsExpandableDiv> = ({ children, expanded }) => {
  const variants = {
    collapsed: { scaleY: 1 },
    expanded: { scaleY: 1 },
  };

  return (
    <motion.div
      initial="collapsed"
      animate={expanded ? "expanded" : "collapsed"}
      variants={variants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="origin-top overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default ExpandableDiv;
