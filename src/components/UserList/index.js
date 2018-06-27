import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import UserList from './UserList';

const query = gql`
query UserList {
  allUsers {
    id
    name
  }
}
`;

export default graphql(query, {
  props: ({ data }) => {
    console.log(data);

    return {
      loading: data.loading,
      users: data.allUsers,
    };
  },
})(UserList);
