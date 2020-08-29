const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  console.log(env);
  const isProduction = env === "production";
  return {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "public"),
      pathinfo: false,
      filename: "bundle.js",
      publicPath: "/",
    },
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
        components: path.resolve(__dirname, "src/components/"),
        utils: path.resolve(__dirname, "src/utils/"),
      },
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: false,
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}",
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
    ],
    devServer: {
      compress: true,
      contentBase: path.resolve(__dirname, "public"),
      hot: true,
      port: 3000,
      stats: "minimal",
      watchOptions: {
        ignored: path.resolve(__dirname, "node_modules"),
      },
    },
    devtool: isProduction ? "source-map" : "inline-source-map",
  };
};
