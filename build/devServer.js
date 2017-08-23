import webpack from 'webpack';
import DevServer from 'webpack-dev-server';
import config from './webpack/dev.config';

const { host, port, ...serverConfig } = config.devServer;
const server = new DevServer(webpack(config), serverConfig);

server.listen(port, host, err => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://${host}:${port}`);
});
