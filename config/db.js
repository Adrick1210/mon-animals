// DEPENDENCIES
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

//LISTENERS
mongoose.connection.on("error", (err) =>
  console.log(err.message + "oops, there is an error")
);
mongoose.connection.on("connected", () => console.log("connected to mongo"));
mongoose.connection.on("disconnected", () =>
  console.log("Disconnected from mongo")
);
