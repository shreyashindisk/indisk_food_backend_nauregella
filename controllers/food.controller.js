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

const updateFood = async (req, res) => {
  try {
    var {
      old_name,
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
    old_name = old_name.trim().toLowerCase();
    category = category.trim().toLowerCase();
    description = description.trim().toLowerCase();
    image = image.trim();

    const food = await Food.findOneAndUpdate(
      {
        name: old_name,
      },
      {
        name: name,
        category: category,
        smallPrice: smallPrice,
        bigPrice: bigPrice,
        description: description,
        image: image,
        smallDiscountPrice: smallDiscountPrice,
        bigDiscountPrice: bigDiscountPrice,
      }
    );

    if (!food) return res.status(400).json({ message: "Food not updated." });

    res.status(201).json("Food updated successfully.");
  } catch (error) {
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

const getAllFoodWithCategoryApp = async (req, res) => {
  try {
    var { category } = req.query;
    category = category.trim().toLowerCase();
    const food = await Food.find({ category: category });

    if (!food) return res.status(400).json({ message: "Food not found." });

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFoodWithCategoryAppNames = async (req, res) => {
  try {
    var { category } = req.query;
    category = category.trim().toLowerCase();
    const food = await Food.find({ category: category });

    if (!food) return res.status(400).json({ message: "Food not found." });
    console.log(food);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const deleteFoodWithName = async (req, res) => {
  try {
    var { name } = req.body;
    name = name.trim().toLowerCase();

    const food = await Food.findOneAndDelete({
      name: name,
      category: "curry rice bowl",
    });
    if (!food) return res.status(404).json({ message: "Food not found." });
    res.status(200).json({ message: "Food deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFood,
  getAllFoodWithCategory,
  getAllFood,
  getAllFoodWithCategoryApp,
  getAllFoodWithCategoryAppNames,
  updateFood,
  deleteFoodWithName,
};
