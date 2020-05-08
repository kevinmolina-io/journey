import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_MY_ENTRIES_QUERY } from "../util/graphql";

function EntryForm() {
  const { values, onChange, onSubmit } = useForm(createEntryCallback, {
    schedule: "",
    goals: "",
    todo: "",
    motivation: "",
    happiness: "",
  });

  const [createEntry, { error }] = useMutation(CREATE_ENTRY_MUTATION, {
    variables: values,
    update(proxy, result) {
      try {
        const data = proxy.readQuery({
          query: FETCH_MY_ENTRIES_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_MY_ENTRIES_QUERY,
          data: {
            getMyEntries: [result.data.createEntry, ...data.getMyEntries],
          },
        });
        values.schedule = "";
        values.goals = "";
        values.todo = "";
        values.motivation = "";
        values.happiness = "";
      } catch (error) {
        console.log(error);
      }
    },
  });

  function createEntryCallback() {
    createEntry();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create an Entry:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Enter your schedule for today"
          name="schedule"
          onChange={onChange}
          value={values.schedule}
        />
        <Form.Input
          placeholder="Enter your goals for today"
          name="goals"
          onChange={onChange}
          value={values.goals}
        />
        <Form.Input
          placeholder="Enter your To-Dos for today"
          name="todo"
          onChange={onChange}
          value={values.todo}
        />
        <Form.Input
          placeholder="What's a motivation today?"
          name="motivation"
          onChange={onChange}
          value={values.motivation}
        />
        <Form.Input
          placeholder="What has made you happy today?"
          name="happiness"
          onChange={onChange}
          value={values.happiness}
        />
        <Button type="submit" color="orange">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}

const CREATE_ENTRY_MUTATION = gql`
  mutation createEntry(
    $schedule: String!
    $goals: String!
    $todo: String!
    $motivation: String!
    $happiness: String!
  ) {
    createEntry(
      schedule: $schedule
      goals: $goals
      todo: $todo
      motivation: $motivation
      happiness: $happiness
    ) {
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

export default EntryForm;
