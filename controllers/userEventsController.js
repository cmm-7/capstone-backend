const express = require("express");
const usersEvents = express.Router();
const {
  getAllUsersEvents,
  getAllUsersEventsForOneUser,
  getFirstFourUsers,
  getTotalRSVPS,
  createUserEvent,
  deleteUserEvent,
} = require("../queries/usersEvents");

// FIRST FOUR USERS
usersEvents.get("/firstfour", async (req, res) => {
  const firstFourUsers = await getFirstFourUsers();
  if (Array.isArray(firstFourUsers)) {
    res.status(200).json(firstFourUsers);
  } else {
    res.status(400).json({ error: "Server Error" });
  }
});

usersEvents.get("/totalrsvps", async (req, res) => {
  const totalRSVPS = await getTotalRSVPS();
  if (Array.isArray(totalRSVPS)) {
    res.status(200).json(totalRSVPS);
  } else {
    res.status(400).json({ error: "Server Error" });
  }
});

usersEvents.get("/:id", async (req, res) => {
  const { id } = req.params;
  const currentUsersEvents = await getAllUsersEventsForOneUser(id);
  if (Array.isArray(currentUsersEvents)) {
    res.status(200).json(currentUsersEvents);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

usersEvents.post("/", async (req, res) => {
  const newUserEvent = await createUserEvent(req.body);
  if (newUserEvent) {
    res.status(200).json(newUserEvent);
  } else {
    res.status(400).json({ error: "Server Error" });
  }
});

usersEvents.delete("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  const deletedUserEvent = await deleteUserEvent(event_id, user_id);
  if (deletedUserEvent) {
    res.status(200).json(deletedUserEvent);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = usersEvents;
