import { ApolloClient } from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null,
  cacheRedirects: {
    Query: {
      node(root, { id }) {
        return toIdValue(id);
      }
    }
  },
});

const httpLink = createHttpLink({
  uri: 'http://172.27.0.74/ow/oxwall/everywhere/api/graphql?XDEBUG_SESSION_START=PHPSTORM',
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
