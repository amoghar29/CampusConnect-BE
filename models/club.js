const mongoose = require('mongoose')

const ClubSchema = new Schema({
    clubName: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    aboutUs: {},
    logo: {
      type: String, // URL or path to the club's logo image
      default: '',
    },
    foundedYear: { type: Number },
    president: { type: String },
    vicePresident: { type: String },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    socialMedia: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
  
    membershipFee: { type: Number },
    totalMembers: { type: Number, default: 0 },
  
    achievements: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const ClubModel = mongoose.model("Club",ClubSchema)
  
  module.exports = { ClubModel}