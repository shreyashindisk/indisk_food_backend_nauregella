const {
  createSide,
  getAllSides,
  updateSide,
  deleteSideWithName,
} = require("../controllers/sides.controller");
const router = require("express").Router();

router.post("/", createSide);
router.put("/", updateSide);
router.get("/", getAllSides);
router.delete("/", deleteSideWithName);

module.exports = router;
