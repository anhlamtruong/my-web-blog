import React from "react";
import Header from "./layout/Header";
import { useStyles } from "@/hooks/useStyles";
import PostWidget from "./layout/PostWidget";
import Categories from "./layout/Categories";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const styles = useStyles();
  return (
    <div className="container h-full mx-auto xl:px-30 max-w-6xl">
      <div className=" grid grid-cols-4 h-full">
        <Header />
        <div
          style={styles.borderStyle}
          className=" col-span-3 lg:col-span-2 border-x-[1px]"
        >
          {children}
        </div>
        <div className="mx-auto col-start-2 col-span-3 lg:col-end-5 lg:col-span-1 lg:sticky relative top-8">
          <PostWidget categories={["test"]} />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Layout;
