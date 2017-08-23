import path from 'path';
import { ProvidePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const rootDir = path.resolve(__dirname, '../..');
const sourceDir = path.join(rootDir, 'src');

export default {
  context: sourceDir,
  entry: {
    main: [
      'babel-polyfill',
      './index.js'
    ],
  },
  output: {
    path: path.join(rootDir, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(sourceDir),
      path.join(rootDir, 'node_modules'),
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new ProvidePlugin({
      React: 'react',
    }),
  ],
};