const {
  add,
  getTodaysTotalOrders,
  getTodaysTimedOrders,
} = require("../controllers/orders.controllers");

const router = require("express").Router();

router.post("/", add);
// router.get("/daily_detail", getTodaysTotalOrders);
router.get("/daily_total", getTodaysTotalOrders);
router.get("/daily_timed_sales", getTodaysTimedOrders);

module.exports = router;
