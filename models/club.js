const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClubSchema = new Schema({
  clubName: { type: String, required: true, unique: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  aboutUs: {},
  logo: {
    type: String, 
    default: "",
  },
  foundedYear: { type: Number },
  president: { type: String },
  vicePresident: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  socialMedia: {
    linkedIn: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },

  membershipFee: { type: Number },
  totalMembers: { type: Number, default: 0 },

  achievements: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Club", ClubSchema);
