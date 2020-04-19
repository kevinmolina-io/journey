const { AuthenticationError, UserInputError } = require("apollo-server");

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
        // check that owner is allowed to submit a retrospect
        if (entry.username === username) {
          entry.retrospect.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          await entry.save();
          return entry;
        }

        throw new AuthenticationError("Action Not Allowed");
      }
      throw new UserInputError("Entry not found");
    },
    async deleteRetrospect(_, { entryId, retrospectId }, context) {
      // Authenticate User
      const { username } = checkAuth(context);

      // Find entry based on ID
      const entry = await Entry.findById(entryId);

      // If entry exists, find index of retrospect by ID
      if (entry) {
        const retrospectIndex = entry.retrospect.findIndex(
          (r) => r.id === retrospectId
        );

        // Verify that retrospect belongs to authenticated user
        if (entry.retrospect[retrospectIndex].username === username) {
          // Delete retrospect from retrospect array based on index
          entry.retrospect.splice(retrospectIndex, 1);
          await entry.save();
          return entry;
        }
        throw new AuthenticationError("Action not allowed");
      }
      throw new UserInputError("Entry not found");
    },
  },
};
