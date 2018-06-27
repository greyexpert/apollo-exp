import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import UserList from './UserList';

const query = gql`
  query UserList {
    users {
      edges {
        node {
          id
          name
          email
        }
      }
    }
  }
`;

export default graphql(query, {
  props: ({ data }) => {
    console.log(data);

    return {
      loading: data.loading,
      users: data.users ? data.users.edges.map(edge => edge.node) : [],
    };
  },
})(UserList);
