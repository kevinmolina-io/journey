const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const Entry = require("./models/Entry");
const { MONGODB } = require("./config");

const typeDefs = gql`
  type Entry {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getEntries: [Entry]
  }
`;

const resolvers = {
  Query: {
    async getEntries() {
      try {
        const entries = await Entry.find();
        return entries;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });
