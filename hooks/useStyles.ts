import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { css } from "@emotion/react";
export const useStyles = () => {
  const { themeColors, theme } = useTheme();
  const {
    backgroundPrimary,
    backgroundTertiary,
    backgroundPrimaryOpacity,
    textPrimary,
    textTertiary,
    textSecondary,
    borderPrimary,
    backgroundSecondary,
    hoverText,
    hoverBorder,
  } = themeColors[theme];
  const styles = useMemo(() => {
    return {
      container: {
        background: backgroundPrimary,
        color: textPrimary,
      },
      backgroundInput: {
        background: backgroundSecondary,
        color: textSecondary,
      },
      backgroundPrimary: {
        background: backgroundPrimary,
      },
      backgroundPrimaryOpacity: {
        background: backgroundPrimaryOpacity,
      },
      backgroundSecondary: {
        background: backgroundSecondary,
      },
      containerWithBorder: {
        background: backgroundPrimary,
        color: textPrimary,
        borderColor: borderPrimary,
      },
      hoverText: {
        color: hoverText,
      },
      textPrimary: {
        color: textPrimary,
      },
      textSecondary: {
        color: textSecondary,
      },
      textTertiary: {
        color: textTertiary,
      },
      button: {
        backgroundColor: backgroundPrimary,
        color: textPrimary,
        padding: "0.5rem 1rem",
        borderRadius: "0.25rem",
        cursor: "pointer",
      },
      textWithHover: css`
        color: ${textPrimary};
        cursor: pointer;
        transition: background-color 0.2s, color 0.2s, ease-in;

        &:hover {
          color: ${hoverText};
        }
      `,

      borderStyle: {
        borderStyle: "solid",
        borderColor: hoverBorder,
      },
    };

    // Add more styles as needed
  }, [
    backgroundPrimary,
    backgroundPrimaryOpacity,
    backgroundSecondary,
    borderPrimary,
    textPrimary,
    textTertiary,
    textSecondary,
    hoverBorder,
    hoverText,
  ]);

  return styles;
};
