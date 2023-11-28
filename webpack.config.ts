import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = "production" | "development";

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? "development", // development, production

    entry: path.resolve(__dirname, "src", "index.ts"),

    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].js",
      clean: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),

      new webpack.ProgressPlugin(),
    ],

    // below code helps us write ts code in project
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },

    devServer: {
      port: env.port ?? 3000,
      open: true,
    },
  };

  return config;
};
