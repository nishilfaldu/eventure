import * as NextImage from "next/image";
import "../styles/index.scss";
import { tailwindTheme } from "../theme";


const customViewports = Object.fromEntries(
  Object.entries(tailwindTheme.screens).map(([key, val], idx) => {
    console.log(val);
    return [
      key,
      {
        name: key,
        styles: {
          width: val,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);

// Allow Storybook to handle Next's <Image> component
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
};
