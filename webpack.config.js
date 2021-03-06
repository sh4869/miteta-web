"use strict";

module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: 'app/main.js'
  },
  resolve: {
    root: __dirname + 'src/',
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
};