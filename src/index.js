import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './layout';

const render = NextRoot  => {
  ReactDOM.render(
    <AppContainer>
      <NextRoot />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Root);

/**
 * Hot module reload
 */
if (module.hot) {
  module.hot.accept('./layout', () => render(require('./layout').default));
}