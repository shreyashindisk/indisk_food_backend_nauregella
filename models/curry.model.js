const mongoose = require("mongoose");

const currySchema = new mongoose.Schema({
  name: {
    type: String,
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

const Curry = mongoose.model("Curry", currySchema);

module.exports = Curry;
