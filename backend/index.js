const express = require("express");
const colors = require("colors");
const server = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/routes/routes");

server.get("/", (req, res) => {
  res.send("Welcome to the Employee CRUD App Server!");
});

mongoose
  .connect("mongodb+srv://Amey45:Amey45@webdev.kioovy1.mongodb.net/Empy")
  .then(() => console.log("Connected to MongoDB".bgMagenta))
  .catch((error) => console.log("Couldn't connect to MongoDB".bgRed));

server.use(cors());

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, HEAD, OPTIONS, PUT"
  );
  next();
});

server.use(express.json());
server.use(bodyParser.json());
server.use(routes);

server.listen(8000, () => {
  try {
    console.log("Server listening on 8000".bgCyan);
  } catch (error) {
    console.log("Error Connecting Server".bgRed);
  }
});
