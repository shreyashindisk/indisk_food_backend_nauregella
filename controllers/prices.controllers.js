const Price = require("../models/prices.model");

const createPrice = async (req, res) => {
  try {
    var { name, price } = req.body;

    name = name.trim().toLowerCase();

    const data = await Price.create({
      name,
      price,
    });

    if (!data) return res.status(400).json({ message: "Price not created." });
    res.status(201).json("Price created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Price already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

const updatePrice = async (req, res) => {
  try {
    const d = req.body;

    await Price.findOneAndUpdate(
      {
        name: d[0].name,
      },
      {
        price: d[0].price,
      }
    );

    await Price.findOneAndUpdate(
      {
        name: d[1].name,
      },
      {
        price: d[1].price,
      }
    );

    res.status(201).json("Price updated successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPrices = async (req, res) => {
  try {
    const data = await Price.find();
    if (!data) return res.status(400).json({ message: "Price not found." });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPricesInternal = async () => {
  try {
    const data = await Price.find();
    return data;
  } catch (error) {
    return [];
  }
};

module.exports = {
  createPrice,
  updatePrice,
  getAllPrices,
  getAllPricesInternal,
};
