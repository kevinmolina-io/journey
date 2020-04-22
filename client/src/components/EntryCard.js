import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

function EntryCard({ entry: { id, createdAt, username, motivation } }) {
  function accomplishEntry() {
    console.log("Entry accomplished");
  }

  return (
    <Card fluid>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
        wrapped
        ui={false}
      />
      <Card.Content as={Link} to={`/entries/${id}`}>
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description as={Link} to={`/entries/${id}`}>
          {motivation}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={accomplishEntry}>
          <Button color="orange" basic>
            <Icon name="check" />
            Accomplished
          </Button>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default EntryCard;
