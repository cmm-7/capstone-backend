const express = require("express");
const users = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../queries/users");

// INDEX
users.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  console.log(allUsers);
  if (Array.isArray(allUsers)) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
});

// SHOW
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

//CREATE
users.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// UPDATE
users.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await updateUser(id, req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// DELETE
users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  if (deletedUser.id) {
    res.status(200).json(deletedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = users;
