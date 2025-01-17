const mongoose = require("mongoose");
const { Schema } = mongoose;
const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  clubId: { type: Schema.Types.ObjectId, ref: "Club", default: null },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  clubName: {type: String}
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
