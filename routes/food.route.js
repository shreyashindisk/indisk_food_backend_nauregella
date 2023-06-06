const router = require("express").Router();
const {
  createFood,
  getAllFoodWithCategory,
  getAllFood,
} = require("../controllers/food.controller");

router.post("/create", createFood);
router.get("/get-all-food-with-category", getAllFoodWithCategory);
router.get("/get-all-food", getAllFood);

module.exports = router;
