const Dessert = require("../models/desserts.model");

const createDessert = async (req, res) => {
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

    const dessert = await Dessert.create({
      name,
      price,
      description,
      image,
    });

    if (!dessert)
      return res.status(400).json({ message: "Dessert not created." });
    res.status(201).json("Dessert created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Dessert already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateDessert = async (req, res) => {
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

    const dessert = await Dessert.findOneAndUpdate(
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

    if (!dessert)
      return res.status(400).json({ message: "Dessert not created." });
    res.status(201).json("Dessert created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Dessert already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

const getAllDesserts = async (req, res) => {
  try {
    var desserts = await Dessert.find();

    if (!desserts)
      return res.status(400).json({ message: "Desserts not found." });

    res.status(200).json(desserts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDessertsInternal = async () => {
  try {
    var desserts;
    desserts = await Dessert.find();
    if (!desserts) throw new Error("Desserts not found.");

    return desserts;
  } catch (error) {
    return [];
  }
};

const deleteDessertWithName = async (req, res) => {
  try {
    var { name } = req.body;
    name = name.trim().toLowerCase();

    const food = await Dessert.findOneAndDelete({
      name: name,
    });
    if (!food) return res.status(404).json({ message: "Dessert not found." });
    res.status(200).json({ message: "Dessert deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDessert,
  getAllDesserts,
  getAllDessertsInternal,
  deleteDessertWithName,
  updateDessert,
};
