const router = require("express").Router();

const {
  register,
  login,
  deleteUser,
} = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.delete("/", deleteUser);
module.exports = router;
