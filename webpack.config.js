const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log(process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    pathinfo: false,
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: isProduction ? "production" : "development",
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
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true, experimentalWatchApi: true },
          },
        ],
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
    alias: {
      types: path.resolve(__dirname, "src/types/"),
      components: path.resolve(__dirname, "src/components/"),
      contexts: path.resolve(__dirname, "src/contexts/"),
      utils: path.resolve(__dirname, "src/utils/"),
    },
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      cacheGroups: {
        default: false,
      },
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
      formatter: {
        type: "codeframe",
        options: { highlightCode: true, linesAbove: 0, linesBelow: 0 },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "dist", "index.html"),
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, "dist"),
    clientLogLevel: "silent",
    historyApiFallback: true,
    hot: true,
    port: 3000,
    stats: "minimal",
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  devtool: isProduction ? "source-map" : "inline-cheap-source-map",
};
