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
    async getEntry(_, { entryId }) {
      try {
        const entry = await Entry.findById(entryId);
        // verify that the entry exists...
        if (entry) {
          return entry;
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
  },
};
