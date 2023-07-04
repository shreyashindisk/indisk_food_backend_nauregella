const {
  createTerminalId,
  updateTerminalId,
  getAllTerminalIds,
} = require("../controllers/terminal.controllers");

const router = require("express").Router();

router.post("/", createTerminalId);
router.put("/", updateTerminalId);
router.get("/", getAllTerminalIds);

module.exports = router;
