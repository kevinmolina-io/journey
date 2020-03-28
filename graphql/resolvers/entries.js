const Entry = require("../../models/Entry");

module.exports = {
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
