const Side = require("../models/sides.model");

const createSide = async (req, res) => {
  try {
    var { name, pricesForDiffCombos, description, image, kitchen } = req.body;

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
    kitchen = kitchen.trim().toLowerCase();

    const side = await Side.create({
      kitchen,
      name,
      pricesForDiffCombos,
      description,
      image,
    });

    if (!side) return res.status(400).json({ message: "Side not created." });
    res.status(201).json("Side created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Side already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

const getAllSides = async (req, res) => {
  try {
    var { kitchen } = req.query;
    var sides;
    kitchen = kitchen.trim().toLowerCase();
    if (kitchen === "central") {
      sides = await Side.find({
        kitchen: { $in: ["central", "both"] },
      });
    } else {
      sides = await Side.find({
        kitchen: { $in: ["sales", "both"] },
      });
    }

    if (!sides) return res.status(400).json({ message: "Sides not found." });

    res.status(200).json(sides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSidesInternal = async () => {
  try {
    var sides;
    sides = await Side.find();
    if (!sides) throw new Error("Sides not found.");

    return sides;
  } catch (error) {
    return [];
  }
};

module.exports = { createSide, getAllSides, getAllSidesInternal };
