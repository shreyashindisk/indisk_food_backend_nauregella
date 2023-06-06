const router = require("express").Router();

const { getInitialData } = require("../controllers/getInitialData.controller");

router.get("/", getInitialData);

module.exports = router;
