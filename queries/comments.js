const db = require("../db/dbConfig");

const getAllComments = async () => {
  try {
    const allComments = await db.any("SELECT * FROM comments");
    return allComments;
  } catch (error) {
    return error;
  }
};

const getEventComments = async (event_id) => {
  try {
    const allComments = await db.any(
      "SELECT comments.id, user_comment, username, profile_pic, user_id, mood FROM comments JOIN users ON comments.user_id = users.id WHERE event_id=$1 ORDER BY created_at",
      Number(event_id)
    );
    return allComments;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// ONE EVENT
const getComment = async (id) => {
  try {
    const oneComment = await db.oneOrNone(
      "SELECT * FROM comments WHERE id=$1",
      id
    );
    return oneComment;
  } catch (error) {
    return error;
  }
};

// CREATE

const createComment = async (id, comment) => {
  const { user_id, user_comment, mood } = comment;
  const created_at = new Date();

  try {
    const newComment = await db.oneOrNone(
      "INSERT INTO comments (user_id, event_id, user_comment, created_at, mood) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, Number(id), user_comment, created_at, mood]
    );
    const commenter = await db.oneOrNone(
      "SELECT username, profile_pic FROM users WHERE id=$1",
      [user_id]
    );
    console.log(commenter);

    return { ...newComment, ...commenter };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE

const deleteComment = async (id) => {
  try {
    const deletedComment = await db.one(
      "DELETE FROM comments WHERE id = $1 RETURNING *",
      id
    );
    return deletedComment;
  } catch (error) {
    return error;
  }
};

// UPDATE

const updateComment = async (id, comment) => {
  const { user_comment } = comment;
  try {
    const updatedComment = await db.one(
      "UPDATE comments SET user_comment=$2 WHERE id=$1 RETURNING *",
      [id, user_comment]
    );
    return updatedComment;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllComments,
  getEventComments,
  getComment,
  createComment,
  deleteComment,
  updateComment,
};
