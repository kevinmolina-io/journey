import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Grid, Segment, Header } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_ENTRIES_QUERY, FETCH_MY_ENTRIES_QUERY } from "../util/graphql";

import EntryCard from "../components/EntryCard";
import EntryForm from "../components/EntryForm";

function Home(props) {
  const { user } = useContext(AuthContext);

  console.log(user);
  const { loading, data } = useQuery(FETCH_MY_ENTRIES_QUERY);

  if (data) {
    console.log(data.getEntries);
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Entries</h1>
        {!user && <h1>Please Login...</h1>}
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <EntryForm />
          </Grid.Column>
        )}

        {loading ? (
          <h1>Loading entries...</h1>
        ) : (
          user &&
          data.getMyEntries &&
          data.getMyEntries.map((entry) => (
            <Grid.Column key={entry.id}>
              <EntryCard entry={entry} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

// : data.getMyEntries && data.getMyEntries.length === 0 ? (
//   <Segment placeholder>
//     <Header icon>No documents are listed for this customer.</Header>
//   </Segment>
// )

export default Home;
