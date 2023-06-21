const express = require("express");
const multer = require("multer");
const path = require("path");
const { getEventComments, createComment } = require("../queries/comments");
const multer = require("multer");
const path = require("path");
const { getEventComments, createComment } = require("../queries/comments");
const events = express.Router();
const {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  updateEventPhotos,
  updateEventCategories,
} = require("../queries/events");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../files/"), // Specify the directory where the file will be saved
  filename: (req, file, cb) => {
    // Generate a unique filename by appending a timestamp to the original file name
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit the file size to 10MB
});

const frontEndUrl = process.env.FRONTEND_URL || 'http://localhost:3333';

// INDEX
events.get("/", async (req, res) => {
  const allEvents = await getAllEvents();
  console.log(allEvents);
  if (Array.isArray(allEvents)) {
    res.status(200).json(allEvents);
  } else {
    res.status(500).json({ error: "server error, can't find events" });
  }
});
  const allEvents = await getAllEvents();
  console.log(allEvents);
  if (Array.isArray(allEvents)) {
    res.status(200).json(allEvents);
  } else {
    res.status(500).json({ error: "server error, can't find events" });
  }
;


// SHOW
// SHOW
events.get("/:id", async (req, res) => {
  const { id } = req.params;
  const event = await getEvent(id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

events.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const comments = await getEventComments(id);
  if (comments) {
    res.json(comments);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
events.post("/", async (req, res) => {
  try {
    const event = await createEvent(req.body);
    res.json(event);
    console.log(req.body)
  } catch (error) {
    res.status(400).json({ error });
  }
});

events.post("/:id/photo", upload.single("event_photo"), async (req, res) => {
  const { id } = req.params;
  console.log(req.file);
  const uploadedFile = req.file.filename;
  const filePath = `/files/${uploadedFile}`;
  console.log(uploadedFile);
  console.log(req.body);
  const staticUrl = `${frontEndUrl}${filePath}`;

  const updatePhotos = await updateEventPhotos(id, staticUrl);

  res.json(updatePhotos);
});

events.post("/:id/comments", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const comment = await createComment(id, req.body);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

// DELETE
events.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedEvent = await deleteEvent(id);
  if (deletedSnack.id) {
    res.status(200).json(deletedEvent);
  } else {
    res.status(400).json("Event not found");
  }
});
  const { id } = req.params;
  const deletedEvent = await deleteEvent(id);
  if (deletedSnack.id) {
    res.status(200).json(deletedEvent);
  } else {
    res.status(400).json("Event not found");
  }
;


// UPDATE
events.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { event_name, event_description, event_address, latitude, longitude, organizer_user_id, group_id, event_date, category } = req.body;
  const updatedEvent = await updateEvent(id, { event_name, event_description, event_address, latitude, longitude, organizer_user_id, group_id, event_date });
  
  // Update event categories
  if (Array.isArray(category)) {
    await updateEventCategories(id, category);
  }

  res.status(200).json(updatedEvent);
});
module.exports = events;
