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
app.use("/eventinterests", eventInterestsController);

// 404 PAGE

app.use("/files", express.static(uploadsDirectory));

// Lightweight DB health and diagnostics endpoint
app.get("/health/db", async (req, res) => {
  try {
    const meta = await db.one(
      "SELECT current_database() AS db, now() AS time"
    );
    const tables = await db.any(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name"
    );
    let usersCount = null;
    try {
      const { count } = await db.one("SELECT COUNT(*) FROM users");
      usersCount = Number(count);
    } catch (err) {
      usersCount = null;
    }
    res.json({
      database: meta.db,
      time: meta.time,
      tables: tables.map((t) => t.table_name),
      usersCount,
    });
  } catch (error) {
    res.status(500).json({ error: "DB health check failed", details: String(error) });
  }
});

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
