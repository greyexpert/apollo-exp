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
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            include: sourceDir,
            loader: 'babel-loader',
            options: {
              compact: true,
            },
          },

          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/[name].[hash:8].[ext]',
            },
          },

          // New loaders here...

          {
            // Fallback loader
            loader: 'file-loader',
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
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