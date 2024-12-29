const mongoose = require("mongoose");
const { type } = require("os");

const { Schema } = mongoose;

const suggestionSchema = new Schema({
  userFullname: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhoneNumber: { type: Number, requierd: true },
  clubName: { type: String, requierd: true },
  suggestedEventTitle: { type: String, requierd: true },
  suggestedEventDescription: { type: String, required: true },
  expectedHeadCount: { type: Number },
  eventDuration: { type: Number, requierd: true },
  additionalNotes: { type: String },
  branch: { type: String },
  semester: { type: Number },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
