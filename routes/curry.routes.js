const {
  createCurry,
  getAllCurrys,
  deleteCurryWithName,
  updateCurry,
} = require("../controllers/curry.controllers");
const router = require("express").Router();

router.post("/", createCurry);
router.get("/", getAllCurrys);
router.put("/", updateCurry);
router.delete("/", deleteCurryWithName);

module.exports = router;
