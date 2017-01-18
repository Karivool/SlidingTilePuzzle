let webpack = require("webpack");
let path = require("path");

let DEV = path.resolve(__dirname, "dev");
let OUTPUT = path.resolve(__dirname, "output");

let config = {
  entry: DEV + "/slidingPuzzle.jsx",
  output: {
    path: OUTPUT,
    filename: "slidingPuzzle.js"
  },
  module: {
    loaders: [{
        include: DEV,
        loader: "babel",
    }]
  }
};

module.exports = config;
