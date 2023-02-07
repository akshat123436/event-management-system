const mongoose = require("mongoose");
// const { schema } = require("./userModel");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please Provide the event title"],
  },
  detail: {
    type: String,
    required: [true, "Please provide the event detail"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, "Event owner is required"],
  },
  invitees: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
});
module.exports = mongoose.model("Event", eventSchema);
