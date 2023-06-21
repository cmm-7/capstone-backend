const express = require("express");
const eventInterests = express.Router();
const {
  getEventInterests,
  createEventInterest,
  deleteEventInterest,
  updateEventInterests,
} = require("../queries/eventInterests");

// INDEX
eventInterests.get("/", async (req, res) => {
  const allEventInterests = await getEventInterests();
  if (Array.isArray(allEventInterests)) {
    res.status(200).json(allEventInterests);
  } else {
    res.status(500).json({ error: "server error, can't find event interests" });
  }
});

// CREATE
eventInterests.post("/", async (req, res) => {
  try {
    const eventInterest = await createEventInterest(req.body);
    res.json(eventInterest);
    console.log(res.json)
  } catch (error) {
    res.status(400).json({ error });
  }
});

// UPDATE
eventInterests.put("/:event_id", async (req, res) => {
    const { event_id } = req.params;
    const { interests } = req.body;
  
    try {
      const updated = await updateEventInterests(event_id, interests);
      if (updated) {
        res.status(200).json({ message: "Event interests updated successfully" });
      } else {
        res.status(400).json({ error: "Event interests update failed" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

// DELETE
eventInterests.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedEventInterest = await deleteEventInterest(id);
  if (deletedEventInterest) {
    res.status(200).json(deletedEventInterest);
  } else {
    res.status(400).json({ error: "Event interest not found" });
  }
});

module.exports = eventInterests;