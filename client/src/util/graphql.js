import gql from "graphql-tag";

export const FETCH_ENTRIES_QUERY = gql`
  {
    getEntries {
      id
      schedule
      goals
      todo
      motivation
      happiness
      createdAt
      username
      retrospect {
        id
        createdAt
        username
        body
      }
      accomplishes {
        id
        createdAt
        username
      }
    }
  }
`;

export const FETCH_MY_ENTRIES_QUERY = gql`
  {
    getMyEntries {
      id
      schedule
      goals
      todo
      motivation
      happiness
      createdAt
      username
      retrospect {
        id
        createdAt
        username
        body
      }
      accomplishes {
        id
        createdAt
        username
      }
    }
  }
`;
