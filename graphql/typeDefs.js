const { gql } = require("apollo-server");

module.exports = gql`
  type Entry {
    id: ID!
    schedule: String
    goals: String!
    todo: String
    motivation: String!
    happiness: String!
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
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
