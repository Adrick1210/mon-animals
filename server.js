// DEPENDENCIES
require("dotenv").config();
require("./config/db.js");

const express = require("express");
const app = express();
const morgan = require("morgan");
const methodOverride = require("method-override");
const { PORT = 3030 } = process.env;
const AnimalController = require("./controllers/animal.js");

// MIDDLE WARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static("public"));

// ROUTER
app.use("/animals", AnimalController);

// TEST
app.get("/", (req, res) => {
  res.send("Hello ANIMALS");
});

// LISTENER
app.listen(PORT, () =>
  console.log(`Listening to the sounds of the port ${PORT}`)
);
