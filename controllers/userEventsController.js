const express = require("express");
const usersEvents = express.Router();
const {
  getAllUsersEvents,
  getFirstFourUsers,
  getTotalRSVPS,
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

module.exports = usersEvents;
