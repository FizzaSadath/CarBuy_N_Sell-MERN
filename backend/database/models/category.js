import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const categoryModel = mongoose.model("category", schema);
export const colorModel = mongoose.model("color", schema);
