const {
  createPrice,
  updatePrice,
  getAllPrices,
} = require("../controllers/prices.controllers");

const router = require("express").Router();

router.post("/", createPrice);
router.put("/", updatePrice);
router.get("/", getAllPrices);

module.exports = router;
