const entriesResolvers = require("./entries");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...entriesResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
};
