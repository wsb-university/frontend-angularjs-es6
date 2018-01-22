const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {join} = require('path');
const PRODUCTION = process.env['PRODUCTION'];

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: !PRODUCTION,
});

const plugins = [
  new HTMLWebpackPlugin({
    template: './src/index.html',
    inject: 'head',
  }),
  extractSass,
];

if (PRODUCTION) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
    }),
  );
}

const config = {
  entry: {
    main: './src/main.js',
    style: './src/style.scss',
  },
  output: {
    filename: '[name].js',
    path: join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: plugins,
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = config;
