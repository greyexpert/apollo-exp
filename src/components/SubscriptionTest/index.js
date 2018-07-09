import React, { Component } from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const subscriptionQuery = gql`
  subscription {
    onMessageAdd(chatId: "Chat:68") {
      id
      content {
        text
      }
      
      user {
        id
        name
      }
      
      chat {
        id
      }
    }
  }
`;

export default class SubscriptionTest extends Component {
  render() {
    return (
      <Subscription subscription={subscriptionQuery}>
        {({ data, loading }) => {
          const text = loading ? "Loading..." : data.onMessageAdd.content.text;

          return (
            <div>Hello subscription: {text}</div>
          );
        }}
      </Subscription>
    );
  }
}
