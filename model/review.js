const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewId: {
    type: Number,
    ref: "foodLabel",
    required: true,
  },
  label: {
    type: Number,
    ref: "foodLabel",
    required: true,
  },
  createdBy: {
    type: Number,
    ref: "User",
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  // ... other fields
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };
