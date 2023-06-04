const db = require("../db/dbConfig");

const getAllUsersEvents = async () => {
  try {
    const allUsersEvents = await db.any("SELECT * FROM users_events");
    return allUsersEvents;
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

module.exports = {
  getAllUsersEvents,
  getFirstFourUsers,
  getTotalRSVPS,
};
