const db = require("../db/dbConfig");

const getAllComments = async () => {
  try {
    const allComments= await db.any("SELECT * FROM comments");
    return allComments;
  } catch (error) {
    return error;
  }
};

const getEventComments = async (event_id) => {
  try {
    const allComments= await db.any("SELECT * FROM comments WHERE event_id=$1", event_id);
    return allComments;
  } catch (error) {
    return error;
  }
};

// ONE EVENT
const getComment= async (id) => {
  try {
    const oneComment = await db.oneOrNone("SELECT * FROM comments WHERE id=$1", id);
    return oneComment;
  } catch (error) {
    return error;
  }
};

// CREATE

const createComment = async (id, comment) => {
  const {
    user_id,
    user_comment
  } = comment;
  const created_at = new Date();
  
  try {
    const newComment = await db.oneOrNone(
      "INSERT INTO comments (user_id, event_id, user_comment, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        user_id,
        id,
        user_comment,
        created_at
      ]
    );
    return newComment;
  } catch (error) {
    console.error(error)
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
  const {
    user_comment
  } = comment;
  try {
    const updatedComment = await db.one(
      "UPDATE comments SET user_comment=$2 WHERE id=$1 RETURNING *",
      [
        id,
        user_comment
      ]
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
