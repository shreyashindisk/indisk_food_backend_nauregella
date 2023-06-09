const mongoose = require("mongoose");

const sideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  kitchen: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: false,
  },
  pricesForDiffCombos: {
    type: Array,
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

const Side = mongoose.model("Side", sideSchema);

module.exports = Side;
