const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true, enums: ["Male", "Female", "Other"] },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;


