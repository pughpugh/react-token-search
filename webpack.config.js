const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  path: __dirname + '/examples',
  filename: "index.html"
});

module.exports = {
  entry: {
    index: path.join(__dirname, "examples/src/index.js")
  },
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  plugins: [htmlWebpackPlugin],
  module: {
	  rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
  devServer: {
    port: 3001
  }
};
