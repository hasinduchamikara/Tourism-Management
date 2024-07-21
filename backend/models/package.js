import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
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
  phone: {
    type: Number,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Package = mongoose.model("Package", packageSchema);
export default Package;
