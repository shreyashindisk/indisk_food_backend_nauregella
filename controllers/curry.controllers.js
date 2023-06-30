const Curry = require("../models/curry.model");

const createCurry = async (req, res) => {
  try {
    var { name, description, image } = req.body;

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

    const curry = await Curry.create({
      name,
      description,
      image,
    });

    if (!curry) return res.status(400).json({ message: "Curry not created." });
    res.status(201).json("Curry created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Curry already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateCurry = async (req, res) => {
  try {
    var { old_name, name, description, image } = req.body;

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

    const curry = await Curry.findOneAndUpdate(
      {
        name: old_name,
      },
      {
        name: name,
        description: description,
        image: image,
      }
    );

    if (!curry) return res.status(400).json({ message: "Curry not created." });
    res.status(201).json("Curry created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Curry already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

const getAllCurrys = async (req, res) => {
  try {
    var currys = await Curry.find();

    if (!currys) return res.status(400).json({ message: "Currys not found." });

    res.status(200).json(currys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCurrysInternal = async () => {
  try {
    var currys;
    currys = await Curry.find();
    if (!currys) throw new Error("Currys not found.");

    return currys;
  } catch (error) {
    return [];
  }
};

const deleteCurryWithName = async (req, res) => {
  try {
    var { name } = req.body;
    name = name.trim().toLowerCase();

    const food = await Curry.findOneAndDelete({
      name: name,
    });
    if (!food) return res.status(404).json({ message: "Curry not found." });
    res.status(200).json({ message: "Curry deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCurry,
  getAllCurrys,
  getAllCurrysInternal,
  deleteCurryWithName,
  updateCurry,
};
