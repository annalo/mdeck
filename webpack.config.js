const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  console.log(env);
  const isProduction = env === "production";
  return {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js",
      publicPath: "/",
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /\.html$/,
          use: "html-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 3000,
    },
    devtool: isProduction ? "source-map" : "inline-source-map",
  };
};
