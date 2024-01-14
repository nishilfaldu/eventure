// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tailwindTheme } = require("./theme");


/** @type {import("tailwindcss").Config}  */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: tailwindTheme,
};
