// DEPENDENCIES
require("dotenv").config();
require("./config/db.js");

const express = require("express");
const app = express();
const morgan = require("morgan");
const methodOverride = require("method-override");
const { PORT = 3030 } = process.env;
const Animal = require("./models/animal.js");
const seedData = require("./models/seed.js");

// MIDDLE WARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static("public"));

// ROUTES

// TEST
app.get("/", (req, res) => {
  res.send("Hello ANIMALS");
});

// Seed
app.get("/animals/seed", async (req, res) => {
  try {
    // Delete all animals
    await Animal.deleteMany({});
    // seed animals
    const animals = await Animal.create(seedData);
    // send animals
    res.json(animals);
  } catch (error) {
    console.log(error.message);
    res.send("Theres a issue with the seeds");
  }
});

// INDEX
app.get("/animals", async (req, res) => {
  try {
    const animals = await Animal.find({});
    res.render("animals/index.ejs", { animals });
  } catch (error) {
    console.log(error.message);
    res.send("Theres a issue with the index");
  }
});

// NEW
app.get("/animals/new", (req, res) => {
  res.render("animals/new.ejs");
});

// CREATE
app.post("/animals", async (req, res) => {
  try {
    req.body.extinct = req.body.extinct === "on" ? true : false;
    await Animal.create(req.body);
    res.redirect("/animals");
  } catch (error) {
    console.log(error.message);
    res.send("Theres a issue with the creation");
  }
});

// EDIT
app.get("/animals/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const animal = await Animal.findById(id);
    res.render("animals/edit.ejs", { animal });
  } catch (error) {
    console.log(error.message);
    res.send("Theres a issue with the edit");
  }
});

// UPDATE
app.put("/animals/:id", async (req, res) => {
  try {
    const id = req.params.id;
    req.body.extinct = req.body.extinct === "on" ? true : false;
    await Animal.findByIdAndUpdate(id, req.body);
    res.redirect(`/animals/${id}`);
  } catch (error) {
    console.log(error.message);
    res.send("Theres a issue with the update");
  }
});

// DESTROY
app.delete("/animals/:id", async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.redirect("/animals");
  } catch (error) {
    console.log(error.message);
    res.send("Theres a issue with the destroy");
  }
});

// SHOW
app.get("/animals/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const animal = await Animal.findById(id);
    res.render("animals/show.ejs", { animal });
  } catch (error) {
    console.log(error.message);
    res.send("Theres a issue with the show");
  }
});

// LISTENER
app.listen(PORT, () =>
  console.log(`Listening to the sounds of the port ${PORT}`)
);
