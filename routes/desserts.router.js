const {
  createDessert,
  getAllDesserts,
  deleteDessertWithName,
  updateDessert,
} = require("../controllers/desserts.controllers");
const router = require("express").Router();

router.post("/", createDessert);
router.get("/", getAllDesserts);
router.put("/", updateDessert);
router.delete("/", deleteDessertWithName);

module.exports = router;
