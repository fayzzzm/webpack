const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "[hash:7].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /(node_modules|bower_components)/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve("./tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash:7].[ext]",
              outputPath: "assets",
            },
          },
        ],
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: "[hash].css",
    }),
  ],
  mode: "development",
  resolve: {
    extensions: [".js", ".ts"],
  },
};
