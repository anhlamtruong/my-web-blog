import React from "react";
import Header from "./layout/Header";
import { useStyles } from "@/hooks/useStyles";
import PostWidget from "./layout/PostWidget";
import Categories from "./layout/Categories";
import FollowBar from "./layout/FollowBar";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const styles = useStyles();
  return (
    <div className="container h-full mx-auto xl:px-30 max-w-7xl">
      <div className=" grid grid-cols-5 h-full">
        <Header />
        <div
          style={styles.borderStyle}
          className=" col-span-4 lg:col-span-3 border-x-[1px]"
        >
          {children}
        </div>
        <div className="mx-auto col-start-2 col-span-4 lg:col-end-6 lg:col-span-1 lg:sticky relative top-8">
          <FollowBar />
          <PostWidget categories={["test"]} />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Layout;
