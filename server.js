// DEPENDENCIES
require("dotenv").config();
require("./config/db.js");

const express = require("express");
const app = express();
const morgan = require("morgan");
const methodOverride = require("method-override");
const { PORT = 3030 } = process.env;
const Animal = require("./models/animal.js");

// MIDDLE WARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static("public"));

// ROUTES
// INDEX
app.get("/", (req, res) => {
  res.render("index.ejs");
});
// NEW

// DESTROY

// UPDATE

// CREATE
app.post("/", (req, res) => {
  const body = req.body;
  if (body.extinct === "on") {
    body.extinct = true;
  } else {
    body.extinct = false;
  }
  
});
// EDIT

// SHOW
// LISTENER
app.listen(PORT, () => console.log(`Listening to the sound of ${PORT}`));
