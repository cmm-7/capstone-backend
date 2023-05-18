const db = require("../db/dbConfig");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
};

// ONE USER
const getUser = async (stytch_id) => {
  try {
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE stytch_id=$1",
      stytch_id
    );
    return user;
  } catch (error) {
    return error;
  }
};

// CREATE USER
const createUser = async (user) => {
  const {
    stytch_id,
    first_name,
    middle_name,
    last_name,
    username,
    about_me,
    interests,
    intra_extraversion,
    phone_number,
  } = user;
  try {
    const newUser = await db.one(
      "INSERT INTO users (stytch_id, first_name, middle_name, last_name, username, about_me, interests, intra_extraversion, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        stytch_id,
        first_name,
        middle_name,
        last_name,
        username,
        about_me,
        interests,
        intra_extraversion,
        phone_number,
      ]
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};

// DELETE USER
const deleteUser = async (stytch_id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE stytch_id=$1 RETURNING *",
      stytch_id
    );
    return deletedUser;
  } catch (error) {
    return error;
  }
};

// UPDATE USER
const updateUser = async (stytch_id, user) => {
  const {
    stytch_id,
    first_name,
    middle_name,
    last_name,
    username,
    about_me,
    interests,
    intra_extraversion,
    phone_number,
  } = user;
  try {
    const updatedUser = await db.one(
      "UPDATE users SET stytch_id=$1, first_name=$2, middle_name=$3, last_name=$4, username=$5, about_me=$6, interests=$7, intra_extraversion=$8, phone_number=$9 WHERE stytch_id=$10 RETURNING *",
      [
        stytch_id,
        first_name,
        middle_name,
        last_name,
        username,
        about_me,
        interests,
        intra_extraversion,
        phone_number,
        id,
      ]
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
