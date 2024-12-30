const mongoose = require("mongoose");
const __id = mongoose.__id;
const { Schema } = mongoose;
const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  clubName: { type: String },
  logo: {
    type: String, // This will store the URL or path to the logo image
    default: "", // You can set a default logo if needed
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
