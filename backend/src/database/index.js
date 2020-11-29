const mongoose = require("mongoose");

const mongoDB = process.env.MONGODB_CONNECTION;
mongoose.connect(
  mongoDB,
  function () {
    // mongoose.connection.db.dropDatabase();
  },
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected!");
});

module.exports = db;
