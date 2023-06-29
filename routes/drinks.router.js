const {
  createDrink,
  getAllDrinks,
} = require("../controllers/drinks.controllers");
const router = require("express").Router();

router.post("/", createDrink);
router.get("/", getAllDrinks);

module.exports = router;
