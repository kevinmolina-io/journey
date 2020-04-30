import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Segment, Header } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

import EntryCard from "../components/EntryCard";

function Home(props) {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { loading, data } = useQuery(FETCH_ENTRIES_QUERY);

  if (data) {
    console.log(data.getEntries);
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Entries</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading entries...</h1>
        ) : data.getEntries && data.getEntries.length === 0 ? (
          <Segment placeholder>
            <Header icon>No documents are listed for this customer.</Header>
          </Segment>
        ) : (
          data.getEntries &&
          data.getEntries.map((entry) => (
            <Grid.Column key={entry.id}>
              <EntryCard entry={entry} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_MY_ENTRIES_QUERY = gql`
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

const FETCH_ENTRIES_QUERY = gql`
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

export default Home;
