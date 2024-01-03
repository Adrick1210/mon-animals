// DEPENDENCIES
const mongoose = require("mongoose");

// SCHEMA
const animalSchema = new mongoose.Schema({
  species: { type: String, required: true },
  extinct: { type: Boolean, required: true },
  location: { type: String, required: true },
  lifeExpectancy: { type: Number, required: true },
});

//COMPOSE
const Animal = mongoose.model("Animal", animalSchema);

// EXPORT
module.exports = Animal;
