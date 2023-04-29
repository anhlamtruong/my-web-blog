import { getLinearGradient, useTheme } from "@/contexts/ThemeContext";
import React from "react";
interface BackgroundGradientProps {
  children: React.ReactNode;
}
const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  children,
}) => {
  const { theme, setTheme } = useTheme();
  const backgroundStyle = {
    backgroundImage: `${getLinearGradient(theme)}`,
  };
  return (
    <div
      className={` min-h-screen w-full absolute themed-background delayed overflow-visible bg-cover bg-scroll bg-repeat
  `}
      style={backgroundStyle}
    >
      {children}
    </div>
  );
};

export default BackgroundGradient;
// const BackgroundGradient = ({}) => {
//   const { theme, setTheme } = useTheme();
//   const backgroundStyle = {
//     backgroundImage: `${getLinearGradient(theme)}`,
//   };
//   return (
//     <div
//       className={`position w-[100vw] h-[100vh] themed-background delayed
//   `}
//       style={backgroundStyle}
//     ></div>
//   );
// };

// export default BackgroundGradient;
