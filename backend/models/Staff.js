const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    work: {
      type: String,
      enum: [
        "Security",
        "Housekeeping",
        "Electrician",
        "Plumber",
        "Gardener",
        "Manager",
      ],
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Staff", staffSchema);