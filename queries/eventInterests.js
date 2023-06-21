const db = require("../db/dbConfig");

const getEventInterests = async () => {
  try {
    const query = "SELECT * FROM event_interests";
    const eventInterests = await db.any(query);
    return eventInterests;
  } catch (error) {
    throw error;
  }
};

const createEventInterest = async (eventInterest) => {
  const { event_id, category } = eventInterest;
  try {
    const query =
      "INSERT INTO event_interests (event_id, category) VALUES ($1, $2) RETURNING *";
    const newEventInterest = await db.one(query, [event_id, category]);
    return newEventInterest;
  } catch (error) {
    throw error;
  }
};

const updateEventInterests = async (event_id, interests) => {
  try {
    // First, delete all existing interests for the event
    const deleteQuery = "DELETE FROM event_interests WHERE event_id = $1";
    await db.none(deleteQuery, [event_id]);

    // Insert new interests for the event
    const insertQuery =
      "INSERT INTO event_interests (event_id, category) VALUES ($1, $2)";
    const insertValues = interests.map((interest) => [event_id, interest]);
    await db.tx(async (transaction) => {
      const queries = insertValues.map((values) =>
        transaction.none(insertQuery, values)
      );
      await transaction.batch(queries);
    });

    return true;
  } catch (error) {
    throw error;
  }
};

const deleteEventInterest = async (eventInterest) => {
  const { event_id, category } = eventInterest;
  try {
    const query =
      "DELETE FROM event_interests WHERE event_id = $1 AND category = $2 RETURNING *";
    const deletedEventInterest = await db.one(query, [event_id, category]);
    return deletedEventInterest;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getEventInterests,
  createEventInterest,
  deleteEventInterest,
  updateEventInterests,
};
