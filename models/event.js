const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true },
  club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  startTime: { type: String, required: true }, // Store as "HH:MM" format
  endTime: { type: String, required: true }, // Store as "HH:MM" format
  location: { type: String, required: true },
  description: { type: String },
  eligibility: { type: String },
  banner:{type:String} , // store image link form s3
  registrationFee: { type: Number },
  teamSize: { type: String },  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  firstPlace:{type:String, default: null},
  secontPlace:{type:String, default: null},
});

module.exports = mongoose.model('Event', EventSchema);
