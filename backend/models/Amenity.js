const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema(
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

    amenity: {
      type: String,
      enum: [
        "Club House",
        "Swimming Pool",
        "Gym",
        "Garden",
        "Community Hall",
      ],
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Amenity", amenitySchema);