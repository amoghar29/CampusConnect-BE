const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  rating: { type: String, required: true },
  selectedCategory: { type: String, required: true },
  feedback: { type: String, required: true },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
