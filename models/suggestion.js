const mongoose = require("mongoose");
const { Schema } = mongoose;

const suggestionSchema = new mongoose.Schema({
  userFullname: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhoneNumber: { type: String },
  clubName: { type: String },
  clubId: { type: Schema.Types.ObjectId, ref: "Club", default: null },
  suggestedEventTitle: { type: String },
  suggestedEventDescription: { type: String, required: true },
  expectedHeadCount: { type: Number },
  expectedDuration: { type: Number },
  additionalNotes: { type: String },
  branch: { type: String },
  semester: { type: String },
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);
module.exports = Suggestion;
