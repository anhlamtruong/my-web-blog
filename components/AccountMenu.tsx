import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { User } from "firebase/auth";
import { signOutUser } from "../lib/firebase/sign_out";
import { useStyles } from "@/hooks/useStyles";
import { BiLogOut } from "react-icons/bi";
interface AccountMenuProps {
  isOpen?: boolean;
  user?: User | null;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ isOpen, user }) => {
  const styles = useStyles();

  if (!isOpen) {
    return null;
  }
  const variants = {
    hidden: { opacity: 0, scaleY: 0.8 },
    visible: { opacity: 1, scaleY: 1 },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="account-dropdown-wrapper"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={styles.containerWithBorder}
          className="origin-top w-56 z-20 absolute top-14 left-4 py-5 flex-col border-2 flex"
        >
          <div className=" flex flex-col gap-3 ">
            <div className="px-3 group/item flex flex-row gap-3 items-center justify-center w-full">
              <Image
                src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="profile avatar"
                width={100}
                height={100}
                quality={100}
                className=" w-8 rounded-md"
              />
              <p
                style={styles.textPrimary}
                className="text-white text-sm group-hover/item:underline"
              >
                {user?.displayName}
              </p>
            </div>
            <hr
              style={styles.backgroundSecondary}
              className=" border-0 h-px my-4"
            />
            <div
              onClick={() => signOutUser()}
              style={styles.textPrimary}
              className=" px-3 text-center text-sm hover:underline flex justify-center items-center gap-4"
            >
              <BiLogOut size={28}></BiLogOut>
              Sign Out
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountMenu;
