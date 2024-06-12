const { VueLoaderPlugin } = require("vue-loader");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/main.ts",
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        extensions: {
          vue: true,
        },
      },
    }),
  ],
};
