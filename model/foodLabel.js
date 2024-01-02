const mongoose = require("mongoose");

var foodLabelSchema = new mongoose.Schema({
  labelId: { type: Number, required: true },
  productName: { type: String, required: true },
  ingredients: { type: String, required: true },
  createdBy: {
    type: Number,
    ref: "User",
    required: true,
  },
  isActive: { type: Boolean, default: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  reviewId: { type: Number },

  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
  },
});
const foodLabel = new mongoose.model("foodLabel", foodLabelSchema);
module.exports = { foodLabel };
