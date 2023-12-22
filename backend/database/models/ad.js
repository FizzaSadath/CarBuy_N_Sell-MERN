import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
  pictures: [
    {
      data: String,
      contentType: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const adModel = mongoose.model("ad", adSchema);

export default adModel;
