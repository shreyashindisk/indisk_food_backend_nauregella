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

const updateDrink = async (req, res) => {
  try {
    var { old_name, name, price, description, image } = req.body;

    if (
      description === undefined ||
      description === null ||
      description === ""
    ) {
      description = "No description available.";
    }

    name = name.trim().toLowerCase();
    old_name = old_name.trim().toLowerCase();
    description = description.trim().toLowerCase();
    image = image.trim();

    const drink = await Drink.findOneAndUpdate(
      {
        name: old_name,
      },
      {
        name: name,
        price: price,
        description: description,
        image: image,
      }
    );

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

const deleteDrinkWithName = async (req, res) => {
  try {
    var { name } = req.body;
    name = name.trim().toLowerCase();

    const food = await Drink.findOneAndDelete({
      name: name,
    });
    if (!food) return res.status(404).json({ message: "Drink not found." });
    res.status(200).json({ message: "Drink deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDrink,
  getAllDrinks,
  getAllDrinksInternal,
  deleteDrinkWithName,
  updateDrink,
};
