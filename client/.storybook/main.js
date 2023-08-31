const config = {
    stories: [
      "../components/**/*.stories.mdx",
      "../components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    staticDirs: ["../public"],
    addons: [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/addon-interactions",
    ],
    framework: {
      name: "@storybook/nextjs",
      options: {},
    },
    docs: {
      autodocs: true,
    },
    features: {
      previewMdx2: true,
    },
  };

  export default config;
