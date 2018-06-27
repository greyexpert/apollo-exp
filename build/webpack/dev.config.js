import { HotModuleReplacementPlugin } from 'webpack';
import { smartStrategy } from 'webpack-merge';
import baseConfig from './config';

const port = 3005;
const host = '0.0.0.0';

const merge = smartStrategy({
  entry: 'prepend',
});

export default merge(baseConfig, {
  mode: 'development',
  entry: {
    main: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${host}:${port}/`,
      'webpack/hot/only-dev-server'
    ]
  },

  plugins: [
    new HotModuleReplacementPlugin(),
  ],

  devServer: {
    host,
    port,
    hot: true,
    noInfo: true,
  },

  devtool: 'source-map',
});
