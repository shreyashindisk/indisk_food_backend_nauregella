const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order: {
    type: Object,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
