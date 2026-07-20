const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    flatNumber: {
      type: String,
      required: true,
    },

    familyMembers: {
      type: Number,
      required: true,
      default: 1,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["resident", "admin"],
      default: "resident",
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);