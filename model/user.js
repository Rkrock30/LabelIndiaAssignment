const mongoose = require("mongoose");

var RegisterSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isActive: { type: Boolean, default: true },
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
  },
});
const register = mongoose.model("User", RegisterSchema);

module.exports = { register };
