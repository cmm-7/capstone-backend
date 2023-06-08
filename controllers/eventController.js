const express = require("express");
const { getEventComments, createComment } = require("../queries/comments");
const events = express.Router();
const {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../queries/events")


// INDEX
events.get("/", async (req, res) => {
    const allEvents = await getAllEvents();
    console.log(allEvents);
    if(Array.isArray(allEvents)){
        res.status(200).json(allEvents);
    } else {
        res.status(500).json({ error: "server error, can't find events"})
    }
})

// SHOW 
events.get("/:id", async (req, res) => {
    const { id } = req.params;
    const event = await getEvent(id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ error: "not found"})
    }
})

events.get("/:id/comments", async (req, res) => {
    const { id } = req.params;
    const comments = await getEventComments(id)
    if (comments) {
        res.json(comments);
    } else {
        res.status(404).json({ error: "not found"})
    }
})

// CREATE
events.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const event = await createEvent(req.body);
        res.json(event);
    } catch (error) {
        res.status(400).json({ error })
    }
})

events.post("/:id/comments", async (req, res) => {
    try {
        console.log(req.body)
        const {id} = req.params
        const comment = await createComment(id, req.body);
        res.json(comment);
    } catch (error) {
        console.error(error)
        res.status(400).json({ error })
    }
})

// DELETE
events.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedEvent = await deleteEvent(id);
    if (deletedSnack.id) {
        res.status(200).json(deletedEvent)
    } else {
        res.status(400).json("Event not found")
    }
})

// UPDATE
events.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedEvent = await updateEvent(id, req.body);
    res.status(200).json(updatedEvent)
});

module.exports = events; 