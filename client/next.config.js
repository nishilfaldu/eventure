/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // seems like current source code for next does not apply linting to app directory
    // add or remove directories accordingly
    // You will see this message during linting: "Pages directory cannot be found at /workspace/client/pages or /workspace/client/src/pages. If using a custom path, please configure with the `no-html-link-for-pages` rule in your eslint config file."
    dirs: ["."],
  },
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
      preventFullImport: true,
    },
  },
  images: {
    // domains: ["a0.muscache.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
