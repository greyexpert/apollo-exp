import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import Root from './layout';
import apolloClient from './graph';

const render = NextRoot  => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={apolloClient}>
        <NextRoot />
      </ApolloProvider>
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
