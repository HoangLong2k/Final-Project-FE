const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { BASE_PATH } = process.env;

const globalEnv = {
  BASE_PATH: BASE_PATH === undefined || BASE_PATH === "" ? "/ekyc/" : BASE_PATH,
};

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
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
  ],
  resolve: {
    modules: ["node_modules", "app"],
    extensions: [".js", ".jsx", ".react.js", ".ts", ".tsx", ".less"],
    alias: {
      "@": path.resolve(__dirname, "../../", "app"),
    },
  },
};
