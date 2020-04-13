const { UserInputError } = require("apollo-server");

const Entry = require("../../models/Entry");

const checkAuth = require("../../util/check_auth");

module.exports = {
  Mutation: {
    createRetrospect: async (_, { entryId, body }, context) => {
      // destructure username from user to use it when creating a new "retrospect"
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty Retrospect comment", {
          errors: {
            body: "Retrospect body must not be emtpy",
          },
        });
      }

      const entry = await Entry.findById(entryId);

      // if the entry exists
      if (entry) {
        entry.retrospect.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await entry.save();
        return entry;
      }

      throw new UserInputError("Entry not found");
    },
  },
};
