const entriesResolvers = require("./entries");
const usersResolvers = require("./users");
const retrospectsResolvers = require("./retrospects");

module.exports = {
  Query: {
    ...entriesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...entriesResolvers.Mutation,
    ...retrospectsResolvers.Mutation,
  },
};
