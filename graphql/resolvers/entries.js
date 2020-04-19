const { AuthenticationError, UserInputError } = require("apollo-server");

const Entry = require("../../models/Entry");
const checkAuth = require("../../util/check_auth");

module.exports = {
  Query: {
    async getEntries() {
      try {
        const entries = await Entry.find().sort({ createdAt: "desc" });
        return entries;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getMyEntries(_, args, context) {
      // Authenticate user
      const user = checkAuth(context);
      // Fetch entries
      try {
        const entries = await Entry.find().sort({ createdAt: "desc" });
        // Filter entries that are of logged in user
        const userEntries = entries.filter((e) => e.username === user.username);
        // return filtered entries
        return userEntries;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getEntry(_, { entryId }, context) {
      // Authenticate user
      const user = checkAuth(context);
      try {
        const entry = await Entry.findById(entryId);
        // verify that the entry exists...
        if (entry) {
          // verify that entry belongs to logged in user...
          if (entry.username === user.username) {
            return entry;
          }
          throw new AuthenticationError("Action Not Allowed");
        }
        throw new Error("Entry not found");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createEntry(
      _,
      { schedule, goals, todo, motivation, happiness },
      context
    ) {
      const user = checkAuth(context);
      // console.log(user);

      if (goals.trim() === "") {
        throw new Error("Goals section must not be empty");
      }

      if (motivation.trim() === "") {
        throw new Error("Motivation section must not be empty");
      }
      if (happiness.trim() === "") {
        throw new Error("Motivation section must not be empty");
      }

      const newEntry = new Entry({
        schedule,
        goals,
        todo,
        motivation,
        happiness,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const entry = await newEntry.save();

      return entry;
    },

    async deleteEntry(_, { entryId }, context) {
      const user = checkAuth(context);

      try {
        const entry = await Entry.findById(entryId);
        if (user.username === entry.username) {
          await entry.delete();
          return "Entry deleted successfully";
        }
        throw new AuthenticationError("Action not allowed");
      } catch (error) {
        throw new Error(error);
      }
    },
    async accomplishEntry(_, { entryId }, context) {
      const { username } = checkAuth(context);

      const entry = await Entry.findById(entryId);

      if (entry) {
        if (
          entry.accomplishes.find(
            (accomplished) => accomplished.username === username
          )
        ) {
          // Entry already "accomplished", un"accomplish" it
          entry.accomplishes = entry.accomplishes.filter(
            (accomplished) => accomplished.username !== username
          );
        } else {
          // Not accomplished, so...accomplish it
          entry.accomplishes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await entry.save();
        return entry;
      }
      throw new UserInputError("Entry not found");
    },
  },
};
