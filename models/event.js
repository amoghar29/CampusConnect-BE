const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  hostingClub: { type: Schema.Types.ObjectId, ref: "Club", required: true },
  hostingClubName: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  startDate: { type: Date }, 
  startTime: { type: String }, 
  location: { type: String, required: true },
  description: { type: String },
  eligibility: { type: String },
  banner: { type: String }, 
  eventImage: { type: String }, 
  registrationFee: { type: String },
  teamSize: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  firstPlace: { type: String, default: undefined },
  secondPlace: { type: String, default: undefined },
  thirdPlace: { type: String, default: undefined },
  formLink: { type: String, default: "" },
});

module.exports = mongoose.model("Event", EventSchema);
