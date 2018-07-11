import { ApolloLink, Observable } from 'apollo-link';
import { print } from 'graphql/language/printer';
import URL from 'url-parse';
import { isString, isObject, trim, isEmpty } from 'lodash';

function addPathPart(url, parts) {
  const urlObject = new URL(url);
  const path = urlObject.pathname.split('/');
  urlObject.pathname = [
    '',
    ...path.filter(trim),
    ...parts,
  ].join('/')

  return urlObject.toString();
}

export class SubscriptionClient {
  constructor({ uri, streamId }) {
    this.uri = addPathPart(uri, [streamId]);

    this.eventSource = null;
    this.subscriptions = {};
  }

  get started() {
    return !!this.eventSource;
  }

  async request(uri, method, body) {
    const res = await fetch(uri.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      timeout: 1000,
    });

    return res.json();
  }

  onMessage = (event) => {
    const message = JSON.parse(event.data);

    console.log(message);

    if (message.type === 'SUBSCRIPTION_DATA') {
      const handler = this.subscriptions[message.subscriptionId];

      handler && handler(message.data);
    }
  };

  onError = (error) => {
    if (this.eventSource.readyState !== EventSource.CONNECTING) {
      this.restart();
    }
  };

  async start() {
    this.eventSource = new EventSource(this.uri);

    await new Promise((resolve, reject) => {
      this.eventSource.addEventListener('open', () => resolve(this.eventSource));
      this.eventSource.addEventListener('error', reject);
    });

    this.eventSource.addEventListener('message', this.onMessage);
    this.eventSource.addEventListener('error', this.onError);

    return this;
  }

  async stop() {
    if (!this.started) {
      return;
    }

    this.eventSource.close();
    this.eventSource = null;
  }

  async restart() {
    await this.stop();

    if (!isEmpty(this.subscriptions)) {
      return this.start();
    }
  }

  async subscribe(options, handler) {
    const { query, variables, operationName, context } = options;

    if (!query) {
      throw new Error('Must provide `query` to subscribe.');
    }

    if (!handler) {
      throw new Error('Must provide `handler` to subscribe.');
    }

    if (
      (operationName && !isString(operationName)) ||
      (variables && !isObject(variables))
    ) {
      throw new Error(
        'Incorrect option types to subscribe. `operationName` must be a string, and `variables` must be an object.'
      );
    }

    const { subscriptionId } = await this.request(this.uri, 'POST', options);

    this.subscriptions[subscriptionId] = handler;
    await this.restart();

    return subscriptionId;
  }

  async unsubscribe(subscriptionId) {
    const url = addPathPart(this.uri, [subscriptionId]);

    await this.request(url, 'DELETE');
    delete this.subscriptions[subscriptionId];

    await this.restart();
  }

  async destroy() {
    await this.stop();
    this.subscriptions = {};

    await this.request(this.uri, 'DELETE');
  }
}

export default class SSELink extends ApolloLink {
  constructor(client) {
    super();

    this.subscriptionClient = client;
  }

  request(operation) {
    return new Observable(observer => {
      const subscriptionId = this.subscriptionClient.subscribe(
        {
          ...operation,
          query: print(operation.query),
        },
        data => observer.next({ data }),
      );

      return () => this.subscriptionClient.unsubscribe(subscriptionId);
    });
  }
}
