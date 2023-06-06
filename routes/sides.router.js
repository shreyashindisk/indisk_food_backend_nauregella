const { createSide, getAllSides } = require("../controllers/sides.controller");
const router = require("express").Router();

router.post("/", createSide);
router.get("/", getAllSides);

module.exports = router;
