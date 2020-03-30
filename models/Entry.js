const { model, Schema } = require("mongoose");

const entrySchema = new Schema({
  schedule: String,
  goals: String,
  todo: String,
  motivation: String,
  happiness: String,
  username: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("Entry", entrySchema);
