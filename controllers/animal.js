// DEPENDENCIES
const express = require("express");
const Animal = require("../models/animal");

// ROUTER
const router = express.Router();

// ROUTES 
// Seed
router.get("/seed", async (req, res) => {
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
  router.get("/", async (req, res) => {
    try {
      const animals = await Animal.find({});
      res.render("animals/index.ejs", { animals });
    } catch (error) {
      console.log(error.message);
      res.send("Theres a issue with the index");
    }
  });
  
  // NEW
  router.get("/new", (req, res) => {
    res.render("animals/new.ejs");
  });
  
  // CREATE
  router.post("/", async (req, res) => {
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
  router.get("/:id/edit", async (req, res) => {
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
  router.put("/:id", async (req, res) => {
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
  router.delete("/:id", async (req, res) => {
    try {
      await Animal.findByIdAndDelete(req.params.id);
      res.redirect("/animals");
    } catch (error) {
      console.log(error.message);
      res.send("Theres a issue with the destroy");
    }
  });
  
  // SHOW
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const animal = await Animal.findById(id);
      res.render("animals/show.ejs", { animal });
    } catch (error) {
      console.log(error.message);
      res.send("Theres a issue with the show");
    }
  });

// EXPORT
module.exports = router