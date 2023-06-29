const {
  createDessert,
  getAllDesserts,
} = require("../controllers/desserts.controllers");
const router = require("express").Router();

router.post("/", createDessert);
router.get("/", getAllDesserts);

module.exports = router;
