const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  labelId: {
    type: Number,
    ref: "foodLabel",
    required: true,
  },
  comments: { type: String, required: true },
  rating: { type: Number, required: true },
  createdBy: {
    type: Number,
    ref: "user",
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
  },
});
const comments = new mongoose.model("Comment", commentSchema);
module.exports = { comments };
