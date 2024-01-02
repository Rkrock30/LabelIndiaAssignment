const mongoose = require("mongoose");

var approvalSchema = new mongoose.Schema({
  labelId: {
    type: Number,
    ref: "foodLabel",
    required: true,
  },
  approvedBy: { type: Number, ref: "User" },
  status: { type: String, enum: ["pending", "approved", "rejected"] },
  approvedOn: { type: Date },
  created_on: {
    type: Date,
    default: Date.now,
  },
});
const approval = new mongoose.model("Approval", approvalSchema);
module.exports = { approval };
