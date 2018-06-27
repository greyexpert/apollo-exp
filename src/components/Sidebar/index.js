import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Sidebar from './Sidebar';

const query = gql`
  query Sidebar {
    node(id: "User:17") {
      ...on User {
        id
        name
        email
      }
    }
  }
`;

export default graphql(query, {
  props: ({ data }) => {
    return {
      loading: data.loading,
      user: data.node,
    };
  },
})(Sidebar);
