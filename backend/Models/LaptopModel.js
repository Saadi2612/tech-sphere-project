const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  specs: {
    type: [String],
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  condition: {
    type: String,
  },
  images: {
    type: [String],
  },
  threeSixtyImages: {
    type: [String],
  },
  SellerAuth:{
type: String
  },
});

module.exports = mongoose.model("Laptop", laptopSchema);
