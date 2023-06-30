const {
  createDrink,
  getAllDrinks,
  deleteDrinkWithName,
  updateDrink,
} = require("../controllers/drinks.controllers");
const router = require("express").Router();

router.post("/", createDrink);
router.get("/", getAllDrinks);
router.put("/", updateDrink);
router.delete("/", deleteDrinkWithName);

module.exports = router;
