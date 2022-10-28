const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// import dotenv from "dotenv";
require("dotenv").config({ path: "./.env" });

const { BASE_PATH, APPLICATION_API } = process.env;

const globalEnv = {
  BASE_PATH: BASE_PATH === undefined || BASE_PATH === "" ? "/ekyc/" : BASE_PATH,
  APPLICATION_API: APPLICATION_API || "localhost:3000",
};

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      templateParameters: { ...globalEnv },
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  resolve: {
    modules: ["node_modules", "app"],
    extensions: [".js", ".jsx", ".react.js", ".ts", ".tsx", ".less"],
    alias: {
      "@": path.resolve(__dirname, "../../", "app"),
    },
  },
};
