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
    event_name,
    event_description,
    event_address,
    latitude,
    longitude,
    organizer_user_id,
    group_id,
    event_date,
    category,
  } = event;
  try {
    const newEvent = await db.oneOrNone(
      "INSERT INTO events (event_name, event_description, event_address, latitude, longitude, organizer_user_id, group_id, event_date, category, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        event_name,
        event_description,
        event_address,
        latitude,
        longitude,
        organizer_user_id,
        group_id,
        event_date,
        category,
        new Date(),
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
    group_id,
    event_date,
  } = event;
  try {
    const updatedEvent = await db.one(
      "UPDATE events SET event_name=$2, event_description=$3, event_address=$4, latitude=$5, longitude=$6, group_id=$7, event_date=$8 WHERE id=$1 RETURNING *",
      [
        id,
        event_name,
        event_description,
        event_address,
        latitude,
        longitude,
        group_id,
        event_date,
      ]
    );
    return updatedEvent;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateEventPhotos = async (id, eventPhotoPicPath) => {
  try {
    const updatedEvent = await db.one(
      "UPDATE events SET event_photos=$1 WHERE id=$2 RETURNING *",
      [[eventPhotoPicPath], id]
    );
    return updatedEvent;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateEventCategories = async (id, categories) => {
  try {
    const updatedEvent = await db.one(
      "UPDATE events SET categories=$1 WHERE id=$2 RETURNING *",
      [categories, id]
    );
    return updatedEvent;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  updateEventPhotos,
};
