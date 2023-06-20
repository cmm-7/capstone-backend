const db = require("../db/dbConfig");

const getAllUsersEvents = async () => {
  try {
    const allUsersEvents = await db.any("SELECT * FROM users_events");
    return allUsersEvents;
  } catch (error) {
    return error;
  }
};

const getAllUsersEventsForOneUser = async (user_id) => {
  try {
    const currentUsersEvents = await db.any(
      "SELECT ue.* FROM users_events ue WHERE ue.user_id = $1",
      [user_id]
    );
    return currentUsersEvents;
  } catch (error) {
    return error;
  }
};

const getTotalRSVPS = async () => {
  try {
    const totalRSVPS = await db.any(
      `SELECT events.id AS event_id, events.event_name, COUNT(users_events.user_id) AS total_rsvps
        FROM events
        LEFT JOIN users_events ON events.id = users_events.event_id
        WHERE users_events.rsvp = TRUE
        GROUP BY events.id, events.event_name;`
    );
    return totalRSVPS;
  } catch (error) {
    return error;
  }
};

const getFirstFourUsers = async () => {
  try {
    const firstFourUsers = await db.any(
      `WITH ranked_events AS (
        SELECT 
            ue.event_id, 
            ue.user_id,
            u.username,
            u.profile_pic,
            ROW_NUMBER() OVER (PARTITION BY ue.event_id ORDER BY ue.user_id) AS rn
        FROM 
            users_events ue
        JOIN
            users u ON ue.user_id = u.id
        WHERE ue.rsvp = TRUE
    )
    SELECT 
        event_id,
        user_id,
        username,
        profile_pic
    FROM 
        ranked_events
    WHERE
        rn <= 4;`
    );
    return firstFourUsers;
  } catch (error) {
    return error;
  }
};

// const createUserEvent = async (event) => {
//   const { user_id, event_id, pinned, rsvp } = event;
//   try {
//     const newUserEvent = await db.oneOrNone(
//       "INSERT INTO users_events (user_id, event_id, pinned, rsvp) VALUES ($1, $2, $3, $4) RETURNING *",
//       [user_id, event_id, pinned, rsvp]
//     );
//     return newUserEvent;
//   } catch (error) {
//     throw error;
//   }
// };

const createUserEvent = async (event) => {
  const { user_id, event_id, pinned, rsvp } = event;
  try {
    const existingUserEvent = await db.oneOrNone(
      "SELECT * FROM users_events WHERE user_id = $1 AND event_id = $2",
      [user_id, event_id]
    );

    if (!existingUserEvent) {
      const newUserEvent = await db.one(
        "INSERT INTO users_events (user_id, event_id, pinned, rsvp) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, event_id, pinned, rsvp]
      );
      return newUserEvent;
    }
  } catch (error) {
    throw error;
  }
};

const deleteUserEvent = async (event_id, user_id) => {
  try {
    const deletedUserEvent = await db.oneOrNone(
      "DELETE FROM users_events WHERE event_id = $1 AND user_id = $2 RETURNING *",
      [event_id, user_id]
    );
    return deletedUserEvent;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsersEvents,
  getAllUsersEventsForOneUser,
  getFirstFourUsers,
  getTotalRSVPS,
  createUserEvent,
  deleteUserEvent,
};
