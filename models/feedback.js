const mongoose = require('mongoose');
const {Schema} = mongoose;

const feedbackSchema = new Schema({
  userExperience: { type: String, required: true },
  userIssue: { type: String, required: true },
  issueDescription: { type: String, required: true },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
