const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: ['./src/js/app.js'],
  publicPath: '/dist/',
  outputJs: 'js/index.js',
  outputCssDir: 'css/',
  outputFontsDir: 'fonts/',
  outputImagesDir: 'img/',
  stylelintConfig: '.stylelintrc.json',
};

const {
  entry,
  publicPath,
  outputJs,
  outputFontsDir,
  outputImagesDir,
  outputCssDir,
} = config;

module.exports = {
  entry,
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, `.${publicPath}`),
    filename: outputJs,
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
          outputPath: outputFontsDir,
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: outputImagesDir,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: `${outputCssDir}[name].css`,
      chunkFilename: 'css/[name].css',
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
};
