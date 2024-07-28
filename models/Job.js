const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "decilned", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
