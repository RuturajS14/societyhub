const Amenity = require("../models/Amenity");

// Get All Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Amenity.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Booking
const createBooking = async (req, res) => {
  try {
    const booking = await Amenity.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Booking Status
const updateBooking = async (req, res) => {
  try {
    const booking = await Amenity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Booking
const deleteBooking = async (req, res) => {
  try {
    await Amenity.findByIdAndDelete(req.params.id);

    res.json({
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};