const Food = require("../models/food.model");

const createFood = async (req, res) => {
  try {
    var {
      name,
      category,
      smallPrice,
      bigPrice,
      description,
      image,
      smallDiscountPrice,
      bigDiscountPrice,
    } = req.body;

    if (
      smallDiscountPrice === undefined ||
      smallDiscountPrice === null ||
      smallDiscountPrice === 0
    ) {
      smallDiscountPrice = smallPrice;
    }
    if (
      bigDiscountPrice === undefined ||
      bigDiscountPrice === null ||
      bigDiscountPrice === 0
    ) {
      bigDiscountPrice = bigPrice;
    }

    if (
      description === undefined ||
      description === null ||
      description === ""
    ) {
      description = "No description available.";
    }

    name = name.trim().toLowerCase();
    category = category.trim().toLowerCase();
    description = description.trim().toLowerCase();
    image = image.trim();

    const food = await Food.create({
      name,
      category,
      smallPrice,
      bigPrice,
      description,
      image,
      smallDiscountPrice,
      bigDiscountPrice,
    });

    if (!food) return res.status(400).json({ message: "Food not created." });

    res.status(201).json("Food created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Food already exists." });
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllFoodWithCategory = async (category) => {
  try {
    category = category.trim().toLowerCase();
    const food = await Food.find({ category: category });
    return food;
  } catch (error) {
    return [];
  }
};

const getAllFood = async (req, res) => {
  try {
    const food = await Food.find();
    res.status(200).json({ food });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createFood, getAllFoodWithCategory, getAllFood };
