const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const customersRoutes = require("./routers/customersRoutes");
const ordersRoutes = require("./routers/ordersRoutes");
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/", customersRoutes);
app.use("/", ordersRoutes);

const initializeServerAndDb = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });

    mongoose.connect(process.env.MONGO_URI, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Database Started");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

initializeServerAndDb();

module.exports = app;
