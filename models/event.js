const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  startDate: { type: Date }, // add req true
  startTime: { type: String }, //add req true ,Store as "HH:MM" formats
  location: { type: String, required: true },
  description: { type: String },
  eligibility: { type: String },
  banner: { type: String }, // store image link form s3
  registrationFee: { type: String },
  teamSize: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  firstPlace: { type: String, default: null },
  secontPlace: { type: String, default: null },
});

module.exports = mongoose.model("Event", EventSchema);
