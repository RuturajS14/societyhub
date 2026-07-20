const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    residentName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    flatNumber: {
      type: String,
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    dueDate: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Maintenance",
  maintenanceSchema
);