const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("hot-module-replacement");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { Target } = require("electron-builder");

const isEnvProduction = process.env.NODE_ENV === "production" ? "browserlist" : "web";
const isEnvDevelopment = process.env.NODE_ENV === "development";

const ElectronReloadPlugin = require('webpack-electron-reload')({
  path: path.join(__dirname, './dist/main.js'),
});

/**@type {import('webpack').import("webpack").Configuration} */

module.exports = {
  target: 'electron-main',
  entry: './src/ts/index.ts',
  devtool: isEnvDevelopment ? "source-map" : false,
  mode: isEnvProduction ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    //publicPath: '/',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json',
    globalObject: 'this'
  },

  devServer: {
    contentBase: path.resolve(__dirname, "/"),
    watchContentBase: true,
    compress: true,
    inline: true,
    hot: true,
    injectHot: true
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx", ".css", ".sass", ".ejs"],
    alias: {
      style: path.resolve(__dirname, 'ui')
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                corejs: 3.16,
                useBuiltIns: "usage",
                targets: "defaults",
              },
            ],
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties"
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("dart-sass"),
            },
          },
        ],
      },
      {
        test: /\.ejs$/i,
        use: ['html-loader', 'template-ejs-loader'],
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    ElectronReloadPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/views/index.ejs',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "package.json",
          to: "package.json",
          transform: (content, _path) => {
            // eslint-disable-line no-unused-vars
            const jsonContent = JSON.parse(content);

            delete jsonContent.devDependencies;
            delete jsonContent.scripts;
            delete jsonContent.build;

            jsonContent.main = "./dist/main.js";
            jsonContent.scripts = { start: "electron ./dist/main.js" };
            jsonContent.postinstall = "electron-builder install-app-deps";

            return JSON.stringify(jsonContent, undefined, 2);
          },
        },
        {
          from: "src/ui/static",
          to: "static"
        },
      ],
    }),
  ],
  externals: {
    mongodb: 'require("mongoose")',
    fs: 'require("fs")',
    path: 'require("path")',
    electron: 'require("electron")',
    express: 'require("express")',
    ejs: 'require("ejs")'
  },
}
