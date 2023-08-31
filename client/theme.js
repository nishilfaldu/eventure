// eslint-disable-next-line @typescript-eslint/no-var-requires
const twColors = require("tailwindcss/colors");

/**
 * This file specifies styles and themes used by Tailwind and Antd.
 */

/**
 * These breakpoints are a mix between those specified by:
 *  - Bootstrap (https://getbootstrap.com/docs/5.0/layout/breakpoints/),
 *  - TailwindCSS (https://tailwindcss.com/docs/screens), and
 *  - Ant Design (https://ant.design/components/layout#breakpoint-width)
 */
const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

const extraColors = {
  // Useful tool for splitting colors https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors
  "7west": {
    state: {
      "success": twColors.cyan[700],
      "success-light": twColors.cyan[600],
      "success-dark": twColors.cyan[800],
      "error": twColors.red[500],
      "error-light": twColors.red[400],
      "error-dark": twColors.red[600],
      "warning": twColors.amber[500],
      "warning-light": twColors.amber[400],
      "warning-dark": twColors.amber[600],
      "progress": twColors.zinc[700],
      "progress-light": twColors.zinc[600],
      "progress-dark": twColors.zinc[800],
      "inactive": twColors.gray[300],
      "inactive-light": twColors.gray[200],
      "inactive-dark": twColors.gray[400],
      "unknown": twColors.sky[950],
      "unknown-light": twColors.sky[800],
    },
    primary: {
      // Example Colors
      50: "#ffeaef",
      100: "#fecbd4",
      200: "#ef979d",
      300: "#e56d77",
      400: "#f04957",
      500: "#f7313e",
      600: "#e7273d",
      700: "#d51b36",
      800: "#c8102f",
      900: "#b90023",
    },
    secondary: {
      "ink": "#091f2c",
      "ivory": "#edece1",
      "sapphire": "#025994",
      "ocean": "#007D8A",
      "sage": "#98BCC0",
      "citrus": "#DFD779",
      "melon": "#DD8547",
      "plum": "#8E1657",
      "prussian-blue": "#0e6a77",
    },
  },
  "transparent": "transparent",
  "transparent-explicit": "rgba(0,0,0,0)",
};

const themeColors = { ...twColors, ...extraColors };

/** @type {import('tailwindcss').Config["theme"]} */
const tailwindTheme = {
  container: {
    center: true,
  },
  extend: {
    colors: extraColors,
    fontFamily: {
      main: "var(--font-montserrat), Montserrat", // theme fonts here
    },
    animation: {
      enter: "enter .2s ease-out",
      leave: "leave .15s ease-in",
    },
    keyframes: {
      enter: {
        "0%": {
          transform: "scale(.9)",
          opacity: "0",
        },
        "100%": {
          transform: "scale(1)",
          opacity: "1",
        },
      },
      leave: {
        "0%": {
          transform: "scale(1)",
          opacity: "1",
        },
        "100%": {
          transform: "scale(0.9)",
          opacity: "0",
        },
      },
    },
  },
  screens: {
    "sm": `${breakpoints.sm}px`,
    "md": `${breakpoints.md}px`,
    "lg": `${breakpoints.lg}px`,
    "xl": `${breakpoints.xl}px`,
    "2xl": `${breakpoints.xxl}px`,
  },
};

/** @type {import("antd").ThemeConfig} */
const antdConfig = {
  // can be used to set properties of antd components
  components: {
    Table: {
      paddingXS: 4,
      colorFillContent: themeColors["transparent-explicit"],
      colorFillAlter: themeColors["transparent-explicit"],
      colorTextHeading: twColors.stone["400"],
      fontWeightStrong: 400,
    },
  },
  token: {
    fontFamily: "var(--font-montserrat), Montserrat",
    borderRadius: 0,
    colorPrimary: themeColors["7west"].primary["800"],
    colorPrimaryBg: themeColors["7west"].primary["500"],
    colorHighlight: themeColors["7west"].primary["100"],
    colorIconHover: twColors.white,
    colorTextHeading: themeColors["7west"].secondary["ink"],
    colorText: themeColors["7west"].secondary["ink"],
    colorTextSecondary: twColors.black,
    colorPrimaryTextHover: twColors.white,

    // Screens/Breakpoints
    screenXSMax: breakpoints.sm - 1,
    screenSM: breakpoints.sm,
    screenSMMin: breakpoints.sm,

    screenSMMax: breakpoints.md - 1,
    screenMD: breakpoints.md,
    screenMDMin: breakpoints.md,

    screenMDMax: breakpoints.lg - 1,
    screenLG: breakpoints.lg,
    screenLGMin: breakpoints.lg,

    screenLGMax: breakpoints.xl - 1,
    screenXL: breakpoints.xl,
    screenXLMin: breakpoints.xl,

    screenXLMax: breakpoints.xxl - 1,
    screenXXL: breakpoints.xxl,
    screenXXLMin: breakpoints.xxl,
  },
};

module.exports = {
  themeColors,
  tailwindTheme,
  antdConfig,
  breakpoints,
};
