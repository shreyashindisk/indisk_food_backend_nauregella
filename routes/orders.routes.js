const {
  add,
  getTodaysTotalOrders,
  getTodaysTimedOrders,
  getPaymentModes,
} = require("../controllers/orders.controllers");

const router = require("express").Router();

router.post("/", add);
// router.get("/daily_detail", getTodaysTotalOrders);
router.get("/daily_total", getTodaysTotalOrders);
router.get("/daily_timed_sales", getTodaysTimedOrders);
router.get("/modes_of_payment", getPaymentModes);

module.exports = router;
