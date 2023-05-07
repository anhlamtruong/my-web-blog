import { useStyles } from "@/hooks/useStyles";
import React from "react";

const FollowBar = () => {
  const styles = useStyles();
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div style={styles.backgroundPrimaryOpacity} className="rounded-md p-4">
        <h2 style={styles.textPrimary} className=" text-xl font-semibold">
          {" "}
          Who To Follow{" "}
        </h2>
        <div className="flex flex-col gap-6 mt-4">{/*TO DO USER LIST*/}</div>
      </div>
    </div>
  );
};

export default FollowBar;
