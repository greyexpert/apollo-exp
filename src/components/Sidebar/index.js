import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Sidebar from './Sidebar';

const query = gql`
query Sidebar {
  User(id: "cj6jd7fk2kver0124unux3co3") {
    name
    email
  }
}
`;

export default graphql(query, {
  props: ({ data }) => {
    console.log('Sidebar');

    return {
      loading: data.loading,
      user: data.User,
    };
  },
})(Sidebar);
