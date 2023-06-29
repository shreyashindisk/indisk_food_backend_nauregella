const Drink = require("../models/drinks.model");

const createDrink = async (req, res) => {
  try {
    var { name, price, description, image } = req.body;

    if (
      description === undefined ||
      description === null ||
      description === ""
    ) {
      description = "No description available.";
    }

    name = name.trim().toLowerCase();
    description = description.trim().toLowerCase();
    image = image.trim();

    const drink = await Drink.create({
      name,
      price,
      description,
      image,
    });

    if (!drink) return res.status(400).json({ message: "Drink not created." });
    res.status(201).json("Drink created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Drink already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

const getAllDrinks = async (req, res) => {
  try {
    var drinks = await Drink.find();

    if (!drinks) return res.status(400).json({ message: "Drinks not found." });

    res.status(200).json(drinks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDrinksInternal = async () => {
  try {
    var drinks;
    drinks = await Drink.find();
    if (!drinks) throw new Error("Drinks not found.");

    return drinks;
  } catch (error) {
    return [];
  }
};

module.exports = { createDrink, getAllDrinks, getAllDrinksInternal };
