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
  uri: 'https://api.graph.cool/simple/v1/cj6jbzcmn00zz0191mq94xnua',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
