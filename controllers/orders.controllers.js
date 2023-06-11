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

const getTodaysTotalOrders = async (req, res) => {
  try {
    var { date } = req.query;
    var month = date.split("-")[1];
    //add 0 to the month if it is less than 10
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    var day = date.split("-")[2];
    //add 0 to the day if it is less than 10
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    var newDate = date.split("-")[0] + "-" + month + "-" + day;
    const ordersForDay = await Order.find({ date: newDate }, { order: 1 });
    //go thorught the orders and add the total number of orders for each item
    var totalOrdersOfEachItem = {};
    var totalAmount = 0;
    for (var i = 0; i < ordersForDay.length; i++) {
      const order = ordersForDay[i].order;
      totalAmount += order.totalAmount;
      if (order.hasOwnProperty("curryRiceBowlOrders")) {
        const curryRiceBowlOrders = order.curryRiceBowlOrders;
        // console.log(curryRiceBowlOrders);
        for (var j = 0; j < curryRiceBowlOrders.length; j++) {
          const riceBowlOrder = curryRiceBowlOrders[j];
          if (riceBowlOrder.name == "butter chicken") {
          }
          if (riceBowlOrder.hasOwnProperty("totalLargeBowlQuantity")) {
            var largeBowlName = "large " + riceBowlOrder.name;
            //if the item is already in the object, add the quantity to the existing quantity
            if (totalOrdersOfEachItem.hasOwnProperty(largeBowlName)) {
              totalOrdersOfEachItem[largeBowlName] =
                totalOrdersOfEachItem[largeBowlName] +
                riceBowlOrder.totalLargeBowlQuantity;
            } else {
              totalOrdersOfEachItem[largeBowlName] =
                riceBowlOrder.totalLargeBowlQuantity;
            }
          }
          if (riceBowlOrder.hasOwnProperty("totalSmallBowlQuantity")) {
            var smallBowlName = "small " + riceBowlOrder.name;
            //if the item is already in the object, add the quantity to the existing quantity
            if (totalOrdersOfEachItem.hasOwnProperty(smallBowlName)) {
              totalOrdersOfEachItem[smallBowlName] =
                totalOrdersOfEachItem[smallBowlName] +
                riceBowlOrder.totalSmallBowlQuantity;
            } else {
              totalOrdersOfEachItem[smallBowlName] =
                riceBowlOrder.totalSmallBowlQuantity;
            }
          }
        }
      }
      if (order.hasOwnProperty("indianPlateOrders")) {
        const indianPlateOrders = order.indianPlateOrders;
        for (var j = 0; j < indianPlateOrders.length; j++) {
          const indianPlateOrder = indianPlateOrders[j];
          const name = indianPlateOrder.name;
          const quantity = indianPlateOrder.quantity;
          var newName = name + " " + "indian plate";
          if (totalOrdersOfEachItem.hasOwnProperty(newName)) {
            totalOrdersOfEachItem[newName] =
              totalOrdersOfEachItem[newName] + quantity;
          } else {
            totalOrdersOfEachItem[newName] = quantity;
          }
        }
      }
      if (order.hasOwnProperty("sidesOrders")) {
        const sidesOrders = order.sidesOrders;
        for (var j = 0; j < sidesOrders.length; j++) {
          const sideOrder = sidesOrders[j];
          const name = sideOrder.name;
          const quantity = sideOrder.quantity;
          if (quantity == 0) {
            continue;
          }
          var newName = name + " " + "side";
          if (totalOrdersOfEachItem.hasOwnProperty(name)) {
            totalOrdersOfEachItem[name] =
              totalOrdersOfEachItem[name] + quantity;
          } else {
            totalOrdersOfEachItem[name] = quantity;
          }
        }
      }
    }
    var totalOrdersForEachItemNameToQuantityObjectArray = [];
    for (var key in totalOrdersOfEachItem) {
      totalOrdersForEachItemNameToQuantityObjectArray.push({
        name: key,
        quantity: totalOrdersOfEachItem[key],
      });
    }
    //sort the array in descending order, the item with the highest quantity will be at the top
    totalOrdersForEachItemNameToQuantityObjectArray.sort(function (a, b) {
      return b.quantity - a.quantity;
    });

    res
      .status(200)
      .json({ totalOrdersForEachItemNameToQuantityObjectArray, totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTodaysTimedOrders = async (req, res) => {
  try {
    var { date } = req.query;
    var month = date.split("-")[1];
    //add 0 to the month if it is less than 10
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    var day = date.split("-")[2];
    //add 0 to the day if it is less than 10
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    var newDate = date.split("-")[0] + "-" + month + "-" + day;
    const ordersForDay = await Order.find(
      { date: newDate },
      { order: 1, time: 1 }
    );

    // we have to find number of orders and amount in given time slots,
    // time slots are 11-12, 12- 1, 1-2, 2-3, 3-4, 4-5, 5-6, 6-7, 7-8, 8-9, 9-10
    // we will create an object with keys as time slots and values as number of orders and amount
    var timeSlots = {
      "11-12": { numberOfOrders: 0, amount: 0 },
      "12-1": { numberOfOrders: 0, amount: 0 },
      "1-2": { numberOfOrders: 0, amount: 0 },
      "2-3": { numberOfOrders: 0, amount: 0 },
      "3-4": { numberOfOrders: 0, amount: 0 },
      "4-5": { numberOfOrders: 0, amount: 0 },
      "5-6": { numberOfOrders: 0, amount: 0 },
      "6-7": { numberOfOrders: 0, amount: 0 },
      "7-8": { numberOfOrders: 0, amount: 0 },
      "8-9": { numberOfOrders: 0, amount: 0 },
      "9-10": { numberOfOrders: 0, amount: 0 },
    };
    var totalAmount = 0;
    for (var i = 0; i < ordersForDay.length; i++) {
      const order = ordersForDay[i].order;
      var time = ordersForDay[i].time;
      const amount = order.totalAmount;
      time = parseInt(time.split(":")[0]);

      totalAmount = totalAmount + amount;

      if (time == 11) {
        timeSlots["11-12"].numberOfOrders =
          timeSlots["11-12"].numberOfOrders + 1;
        timeSlots["11-12"].amount = timeSlots["11-12"].amount + amount;
      } else if (time == 12) {
        timeSlots["12-1"].numberOfOrders = timeSlots["12-1"].numberOfOrders + 1;
        timeSlots["12-1"].amount = timeSlots["12-1"].amount + amount;
      } else if (time == 1) {
        timeSlots["1-2"].numberOfOrders = timeSlots["1-2"].numberOfOrders + 1;
        timeSlots["1-2"].amount = timeSlots["1-2"].amount + amount;
      } else if (time == 2) {
        timeSlots["2-3"].numberOfOrders = timeSlots["2-3"].numberOfOrders + 1;
        timeSlots["2-3"].amount = timeSlots["2-3"].amount + amount;
      } else if (time == 3) {
        timeSlots["3-4"].numberOfOrders = timeSlots["3-4"].numberOfOrders + 1;
        timeSlots["3-4"].amount = timeSlots["3-4"].amount + amount;
      } else if (time == 4) {
        timeSlots["4-5"].numberOfOrders = timeSlots["4-5"].numberOfOrders + 1;
        timeSlots["4-5"].amount = timeSlots["4-5"].amount + amount;
      } else if (time == 5) {
        timeSlots["5-6"].numberOfOrders = timeSlots["5-6"].numberOfOrders + 1;
        timeSlots["5-6"].amount = timeSlots["5-6"].amount + amount;
      } else if (time == 6) {
        timeSlots["6-7"].numberOfOrders = timeSlots["6-7"].numberOfOrders + 1;
        timeSlots["6-7"].amount = timeSlots["6-7"].amount + amount;
      } else if (time == 7) {
        timeSlots["7-8"].numberOfOrders = timeSlots["7-8"].numberOfOrders + 1;
        timeSlots["7-8"].amount = timeSlots["7-8"].amount + amount;
      } else if (time == 8) {
        timeSlots["8-9"].numberOfOrders = timeSlots["8-9"].numberOfOrders + 1;
        timeSlots["8-9"].amount = timeSlots["8-9"].amount + amount;
      } else if (time == 9) {
        timeSlots["9-10"].numberOfOrders = timeSlots["9-10"].numberOfOrders + 1;
        timeSlots["9-10"].amount = timeSlots["9-10"].amount + amount;
      }
    }

    //convert the object to an array of objects
    var timeSlotsArray = [];
    for (var key in timeSlots) {
      timeSlotsArray.push({
        timeSlot: key,
        numberOfOrders: timeSlots[key].numberOfOrders,
        amount: timeSlots[key].amount,
      });
    }
    res.status(200).json({ timeSlotsArray, totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentModes = async (req, res) => {
  try {
    var { date } = req.query;
    var month = date.split("-")[1];
    //add 0 to the month if it is less than 10
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    var day = date.split("-")[2];
    //add 0 to the day if it is less than 10
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    var newDate = date.split("-")[0] + "-" + month + "-" + day;
    const ordersForDay = await Order.find({ date: newDate }, { order: 1 });

    // we have to find number of orders and amount in given time slots,
    // time slots are 11-12, 12- 1, 1-2, 2-3, 3-4, 4-5, 5-6, 6-7, 7-8, 8-9, 9-10
    // we will create an object with keys as time slots and values as number of orders and amount
    var totalAmount = 0;
    var diffPaymentModesOrdersAndAmountTotal = {
      Card: { numberOfOrders: 0, amount: 0 },
      "Mobile Pay": { numberOfOrders: 0, amount: 0 },
      Cash: { numberOfOrders: 0, amount: 0 },
      "Street Credit": { numberOfOrders: 0, amount: 0 },
      "Gift Card": { numberOfOrders: 0, amount: 0 },
    };

    for (var i = 0; i < ordersForDay.length; i++) {
      const order = ordersForDay[i].order;
      var modeOfPaymentName = order.modeOfPaymentName;
      const amount = order.totalAmount;
      totalAmount = totalAmount + amount;
      diffPaymentModesOrdersAndAmountTotal[modeOfPaymentName].numberOfOrders =
        diffPaymentModesOrdersAndAmountTotal[modeOfPaymentName].numberOfOrders +
        1;
      diffPaymentModesOrdersAndAmountTotal[modeOfPaymentName].amount =
        diffPaymentModesOrdersAndAmountTotal[modeOfPaymentName].amount + amount;
    }

    //convert the object to an array of objects
    var diffPaymentModesOrdersAndAmountTotalArray = [];
    for (var key in diffPaymentModesOrdersAndAmountTotal) {
      diffPaymentModesOrdersAndAmountTotalArray.push({
        mode: key,
        orders: diffPaymentModesOrdersAndAmountTotal[key].numberOfOrders,
        amount: diffPaymentModesOrdersAndAmountTotal[key].amount,
      });
    }
    res
      .status(200)
      .json({ diffPaymentModesOrdersAndAmountTotalArray, totalAmount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  add,
  getTodaysTotalOrders,
  getTodaysTimedOrders,
  getPaymentModes,
};
