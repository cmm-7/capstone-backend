const express = require("express");
const cors = require("cors");
const multer = require("multer");

const path = require("path");
const uploadsDirectory = path.join(__dirname, "/files");

// CONFIGURATION
const app = express();

const db = require("./db/dbConfig");

//MIDDLEWARE
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to our capstone project backend");
});

console.log(path.resolve(__dirname, "files"));
// EVENTS ROUTES

const eventController = require("./controllers/eventController");
app.use("/events", eventController);

const userController = require("./controllers/userController");
app.use("/users", userController);

// app.get("/users/:stytch_id/stytch", async (req, res) => {
//   const { stytch_id } = req.params;
//   const user = await db.oneOrNone(
//     "SELECT * FROM users WHERE stytch_id = $1",
//     stytch_id
//   );
//   res.json(user);
// });

const usersEventsContoller = require("./controllers/userEventsController");
app.use("/usersevents", usersEventsContoller);

const commentsController = require("./controllers/commentsController");
app.use("/comments", commentsController);

const eventInterestsController = require("./controllers/eventInterestsController");
app.use("/eventinterests", eventInterestsController)

// 404 PAGE

app.use("/files", express.static(uploadsDirectory));

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// app.get("/db", async (req, res) => {
//   let results = await db.any("SELECT * FROM test");
//   res.send(results);
// });

// uploads route
// app.use( express.static(uploadsDirectory));

module.exports = app;
