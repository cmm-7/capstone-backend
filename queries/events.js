const db = require("../db/dbConfig");

const getAllEvents = async () => {
  try {
    const allEvents = await db.any("SELECT * FROM events");
    return allEvents;
  } catch (error) {
    return error;
  }
};

// ONE EVENT
const getEvent = async (id) => {
  try {
    const oneEvent = await db.oneOrNone("SELECT * FROM events WHERE id=$1", id);
    return oneEvent;
  } catch (error) {
    return error;
  }
};

// CREATE

const createEvent = async (event) => {
  const {
    id,
    event_name,
    event_description,
    event_address,
    latitude,
    longitude,
    organizer_user_id,
    group_id,
  } = event;
  try {
    const newEvent = await db.oneOrNone(
      "INSERT INTO events (id, event_name, event_description, event_address, latitude, longitude, organizer_user_id, group_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        id,
        event_name,
        event_description,
        event_address,
        latitude,
        longitude,
        organizer_user_id,
        group_id,
      ]
    );
    return newEvent;
  } catch (error) {
    throw error;
  }
};

// DELETE

const deleteEvent = async (id) => {
  try {
    const deletedEvent = await db.one(
      "DELETE FROM events WHERE id = $1 RETURNING *",
      id
    );
    return deletedEvent;
  } catch (error) {
    return error;
  }
};

// UPDATE

const updateEvent = async (id, event) => {
  const {
    event_name,
    event_description,
    event_address,
    latitude,
    longitude,
    organizer_user_id,
    group_id,
  } = event;
  try {
    const updatedEvent = await db.one(
      "UPDATE events SET id=$1, event_name=$2, event_description=$3, event_address=$4, latitude=$5, longitude=$6, organizer_user_id=$7, group_id=$8 RETURNING *",
      [
        id,
        event_name,
        event_description,
        event_address,
        latitude,
        longitude,
        organizer_user_id,
        group_id,
      ]
    );
    return updatedEvent;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
