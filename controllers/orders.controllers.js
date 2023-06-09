const Order = require("../models/orders.model");

const add = async (req, res) => {
  try {
    var order = req.body;
    //get the date, day, month, year
    //get day name of the week, eg: Monday, Tuesday, etc.

    console.log(req.body);

    var date = new Date();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var day = days[date.getDay()];
    var month = monthList[date.getMonth()];
    var year = date.getFullYear();
    // date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + year;
    date = date.toISOString().split("T")[0];

    var newOrder;
    //go through the order object and add the items to the newOrder object only if the value is not 0
    if (order.curryRiceBowlOrders.length == 0) {
      delete order.curryRiceBowlOrders;
    } else {
      //delete unwanted properties
      for (var i = 0; i < order.curryRiceBowlOrders.length; i++) {
        var curryRiceBowl = order.curryRiceBowlOrders[i];
        if (curryRiceBowl.smallBowlWithWhiteRice == 0) {
          delete curryRiceBowl.smallBowlWithWhiteRice;
        }
        if (curryRiceBowl.smallBowlWithBrownRice == 0) {
          delete curryRiceBowl.smallBowlWithBrownRice;
        }
        if (curryRiceBowl.smallBowlWRWithChilli == 0) {
          delete curryRiceBowl.smallBowlWRWithChilli;
        }
        if (curryRiceBowl.smallBowlWRWithCoriander == 0) {
          delete curryRiceBowl.smallBowlWRWithCoriander;
        }
        if (curryRiceBowl.smallBowlWRWithChilliAndCoriander == 0) {
          delete curryRiceBowl.smallBowlWRWithChilliAndCoriander;
        }
        if (curryRiceBowl.smallBowlBRWithChilli == 0) {
          delete curryRiceBowl.smallBowlBRWithChilli;
        }
        if (curryRiceBowl.smallBowlBRWithCoriander == 0) {
          delete curryRiceBowl.smallBowlBRWithCoriander;
        }
        if (curryRiceBowl.smallBowlBRWithChilliAndCoriander == 0) {
          delete curryRiceBowl.smallBowlBRWithChilliAndCoriander;
        }
        if (curryRiceBowl.largeBowlWithWhiteRice == 0) {
          delete curryRiceBowl.largeBowlWithWhiteRice;
        }
        if (curryRiceBowl.largeBowlWithBrownRice == 0) {
          delete curryRiceBowl.largeBowlWithBrownRice;
        }
        if (curryRiceBowl.largeBowlWRWithChilli == 0) {
          delete curryRiceBowl.largeBowlWRWithChilli;
        }
        if (curryRiceBowl.largeBowlWRWithCoriander == 0) {
          delete curryRiceBowl.largeBowlWRWithCoriander;
        }
        if (curryRiceBowl.largeBowlWRWithChilliAndCoriander == 0) {
          delete curryRiceBowl.largeBowlWRWithChilliAndCoriander;
        }
        if (curryRiceBowl.largeBowlBRWithChilli == 0) {
          delete curryRiceBowl.largeBowlBRWithChilli;
        }
        if (curryRiceBowl.largeBowlBRWithCoriander == 0) {
          delete curryRiceBowl.largeBowlBRWithCoriander;
        }
        if (curryRiceBowl.largeBowlBRWithChilliAndCoriander == 0) {
          delete curryRiceBowl.largeBowlBRWithChilliAndCoriander;
        }
        if (curryRiceBowl.totalSmallBowlQuantity == 0) {
          delete curryRiceBowl.totalSmallBowlQuantity;
        }
        if (curryRiceBowl.totalLargeBowlQuantity == 0) {
          delete curryRiceBowl.totalLargeBowlQuantity;
        }
      }
    }
    if (order.indianPlateOrders.length == 0) {
      delete order.indianPlateOrders;
    }
    if (order.sidesOrders.length == 0) {
      delete order.sidesOrders;
    }
    delete order.modeOfPayment;

    await Order.create({
      order,
      day,
      month,
      year,
      date,
      time: order.time,
    });
    res.status(201).json("Order created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Order already exists." });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = { add };
