require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/user.route");
const foodRouter = require("./routes/food.route");
const getInitialDataRouter = require("./routes/getInitialData.route.js");
const sidesRouter = require("./routes/sides.router.js");
const drinksRouter = require("./routes/drinks.router.js");
const dessertsRouter = require("./routes/desserts.router.js");
const ordersRouter = require("./routes/orders.routes.js");

const app = express();

const port = 5000;
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/get_all", getInitialDataRouter);
app.use("/sides", sidesRouter);
app.use("/drinks", drinksRouter);
app.use("/desserts", dessertsRouter);
app.use("/orders", ordersRouter);

mongoose.connect(
  "mongodb+srv://shreyashbdhamane0:W36xTzVoJSpeluZJ@cluster0.ttrfz30.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ... ${port}`);
});
