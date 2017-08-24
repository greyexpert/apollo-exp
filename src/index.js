import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface } from 'react-apollo';

import Root from './layout';

const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6jbzcmn00zz0191mq94xnua'
});

const client = new ApolloClient({
  networkInterface: networkInterface,
});

const render = NextRoot  => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
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