const { getAllFoodWithCategory } = require("../controllers/food.controller");
const { getAllSidesInternal } = require("../controllers/sides.controller.js");
const { getAllCurrysInternal } = require("../controllers/curry.controllers.js");
const {
  getAllPricesInternal,
} = require("../controllers/prices.controllers.js");
const {
  getAllDrinksInternal,
} = require("../controllers/drinks.controllers.js");
const {
  getAllDessertsInternal,
} = require("../controllers/desserts.controllers.js");

const getInitialData = async (req, res) => {
  try {
    const curryRiceBowl = await getAllFoodWithCategory("curry rice bowl");
    const sides = await getAllSidesInternal();
    const drinks = await getAllDrinksInternal();
    const desserts = await getAllDessertsInternal();
    const curries = await getAllCurrysInternal();
    const prices = await getAllPricesInternal();
    res
      .status(200)
      .json({ curryRiceBowl, sides, drinks, desserts, curries, prices });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getInitialData };
