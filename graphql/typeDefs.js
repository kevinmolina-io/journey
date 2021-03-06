const { gql } = require("apollo-server");

module.exports = gql`
  type Entry {
    id: ID!
    schedule: String!
    goals: String!
    todo: String!
    motivation: String!
    happiness: String!
    createdAt: String!
    username: String!
    retrospect: [Retrospect]!
    accomplishes: [Accomplish]!
  }
  type Retrospect {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Accomplish {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getEntries: [Entry]
    getEntry(entryId: ID!): Entry
    getMyEntries: [Entry]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createEntry(
      schedule: String
      goals: String
      todo: String
      motivation: String!
      happiness: String!
    ): Entry!
    deleteEntry(entryId: ID!): String!
    createRetrospect(entryId: String!, body: String!): Entry!
    deleteRetrospect(entryId: ID!, retrospectId: ID!): Entry!
    accomplishEntry(entryId: ID!): Entry!
  }
`;
