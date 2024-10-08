// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { watch } = require("fs");
const { merge } = require("webpack-merge");
const common = require('./webpack.common.config.js')


module.exports =  module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './src',
  },
});