const db = require("../db/dbConfig");

const getAllUsersEvents = async () => {
  try {
    const allUsersEvents = await db.any("SELECT * FROM users_events");
    return allUsersEvents;
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
            COUNT(*) OVER (PARTITION BY ue.event_id) AS total_rsvps,
            ROW_NUMBER() OVER (PARTITION BY ue.event_id ORDER BY ue.user_id) AS rn
        FROM 
            users_events ue
        JOIN
            users u ON ue.user_id = u.id
    )
    SELECT 
        event_id,
        user_id,
        username,
        profile_pic,
        total_rsvps
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
};
