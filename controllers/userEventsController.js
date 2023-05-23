const express = require("express");
const usersEvents = express.Router();
const {
  getAllUsersEvents,
  getFirstFourUsers,
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

module.exports = usersEvents;
