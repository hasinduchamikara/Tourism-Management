import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const PackageBooking = mongoose.model("PackageBooking", packageSchema);
export default PackageBooking;
