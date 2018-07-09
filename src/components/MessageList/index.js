import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import MessageList from './MessageList';

const messageFragment = gql`
  fragment MessageList_node on Message {
      id
      content {
        text
      }
      
      user {
        id
        name
        avatar {
          id
          url
        }
      }
      
      chat {
        id
      }
  }
`;

const subscription = gql`
  subscription {
    onMessageAdd(chatId: "Chat:68") {
      id
      ...MessageList_node
    }
  }
  
  ${messageFragment}
`;

const query = gql`
  query Chat {
    chat: node(id: "Chat:68") {
      ...on Chat {
        participants {
          id
          name
        }
        messages(first: 10) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
  
          edges {
            node {
              id
              ...MessageList_node
            }
          }
        }
      }
    }
  }
  
  ${messageFragment}
`;

export default graphql(query, {
  props: ({ data }) => {
    return {
      subscribeToMore() {
        data.subscribeToMore({
          document: subscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;

            const newEdge = {
              __typename: 'MessageEdge',
              node: subscriptionData.data.onMessageAdd,
            };

            return update(prev, {
              chat: {
                messages: {
                  edges: {
                    $unshift: [newEdge],
                  }
                }
              }
            });
          },
        });
      },
      loading: data.loading,
      messages: data.chat ? data.chat.messages.edges.map(edge => edge.node) : [],
    };
  },
})(MessageList);
