const { model, Schema } = require("mongoose");

const entrySchema = new Schema({
  title: String,
  body: String,
  username: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("Entry", entrySchema);
