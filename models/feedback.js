const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  rating: { type: String, required: true },
  selectedCategory: { type: String, required: true },
  experienceDescription: { type: String, required: true },
  eventTitle: { type: String },
  hostingClub: { type: Schema.Types.ObjectId, ref: "Club", required: true },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
