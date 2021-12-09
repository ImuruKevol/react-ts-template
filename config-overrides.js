const { override, addWebpackAlias } = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");
const path = require("path");

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  }),
  addWebpackAlias({
    "@svg": path.resolve(__dirname, "src/styles/svg"),
    "@com": path.resolve(__dirname, "src/components/common"),
    "@c": path.resolve(__dirname, "src/components"),
    "@": path.resolve(__dirname, "src"),
    "@r": path.resolve(__dirname, "src/reducers"),
  })
);
