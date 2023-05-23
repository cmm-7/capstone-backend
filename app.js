const express = require("express");
const db = require("./db/dbConfig");
const cors = require("cors");

// CONFIGURATION
const app = express();

//MIDDLEWARE

app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to our capstone project backend");
});

// EVENTS ROUTES

const eventController = require("./controllers/eventController");
app.use("/events", eventController);

const userController = require("./controllers/userController");
app.use("/users", userController);

const usersEventsContoller = require("./controllers/userEventsController");
app.use("/usersevents", usersEventsContoller);

// 404 PAGE

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// app.get("/db", async (req, res) => {
//   let results = await db.any("SELECT * FROM test");
//   res.send(results);
// });

module.exports = app;
