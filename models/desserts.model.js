const mongoose = require("mongoose");

const dessertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Dessert = mongoose.model("Dessert", dessertSchema);

module.exports = Dessert;
