const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: false },
  category: { type: String, required: true },
  smallPrice: { type: Number, required: true },
  bigPrice: { type: Number, required: true },
  description: { type: String, required: false },
  image: { type: String, required: true },
  smallDiscountPrice: { type: Number, required: false },
  bigDiscountPrice: { type: Number, required: false },
});

const Food = mongoose.model("food", foodSchema);

module.exports = Food;
