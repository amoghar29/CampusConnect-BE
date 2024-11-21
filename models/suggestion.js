const mongoose = require('mongoose');

const {Schema} = mongoose;

const suggestionSchema = new Schema({
  userFullname: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhoneNumber: { type: Number, requierd: true },
  collegeClub: { type: String, requierd: true },
  suggestedEventTitle: { type: String, requierd: true },
  suggestedEventDescription: { type: String, required: true },
  expectedHeadCount: { type: Number },
  eventDuration: { type: Number, requierd: true },
  additionalNotes: { type: String },
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
