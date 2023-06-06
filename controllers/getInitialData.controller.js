const { getAllFoodWithCategory } = require("../controllers/food.controller");
const { getAllSidesInternal } = require("../controllers/sides.controller.js");

const getInitialData = async (req, res) => {
  try {
    const curryRiceBowl = await getAllFoodWithCategory("curry rice bowl");
    const sides = await getAllSidesInternal("central");
    res.status(200).json({ curryRiceBowl, sides });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getInitialData };
