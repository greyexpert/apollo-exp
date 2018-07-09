import { ApolloClient } from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { toIdValue, getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient, SSELink } from 'subscriptions-transport-sse';

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

const sseLink = new SSELink(
  new SubscriptionClient(
    `http://172.27.0.74/ow/oxwall/everywhere/api/subscriptions`,
    {},
  ),
);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  sseLink,
  httpLink,
);

const client = new ApolloClient({
  connectToDevTools: true,
  link,
  cache: new InMemoryCache()
});

export default client;
