const router = require("express").Router();
const {
  createFood,
  getAllFoodWithCategoryApp,
  getAllFoodWithCategoryAppNames,
  getAllFood,
} = require("../controllers/food.controller");

router.post("/create", createFood);
router.get("/get-all-food-with-category", getAllFoodWithCategoryApp);
router.get("/get-all-food-with-category/names", getAllFoodWithCategoryAppNames);
router.get("/get-all-food", getAllFood);

module.exports = router;
