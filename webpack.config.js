const path = require("path");
const webpack = require('webpack');
const ESLintPlugin = require("eslint-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(json|png|jpg|gif|txt|ico)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      extensions: ["js", "jsx"],
      exclude: ["/node_modules/"],
    }),
    new WebpackManifestPlugin({ publicPath: "/public/" }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    hot: true,
  },
};
