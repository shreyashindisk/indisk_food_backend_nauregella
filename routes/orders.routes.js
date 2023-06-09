const { add } = require("../controllers/orders.controllers");

const router = require("express").Router();

router.post("/", add);

module.exports = router;
