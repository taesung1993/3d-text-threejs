const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  entry: "./src/script.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.[contenthash].js",
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "static"),
        },
      ],
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
        },
      },
      // JS
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // CSS
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // Images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: 'static/images/[hash][ext]',
        }
      },
    ],
  },
};