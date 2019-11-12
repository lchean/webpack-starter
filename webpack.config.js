const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const publicPath = '/public/';

module.exports = {
  entry: ['./src/js/app.js'],
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
    chunkFilename: '[name].js',
    publicPath,
  },
  watch: true,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: devMode,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new StyleLintPlugin({
      configFile: '.stylelintrc.json',
      files: './src/scss/**/*',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      minSize: 0,
    },
  },
  devServer: {
    compress: true,
    port: 9000,
    clientLogLevel: 'silent',
    publicPath,
  },
};
