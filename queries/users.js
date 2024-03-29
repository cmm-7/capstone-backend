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
const getUser = async (idParam) => {
  try {
    const user = await db.oneOrNone(
      `SELECT * FROM users WHERE ${
        idParam.includes("user") ? "stytch_id=$1" : "id=$1"
      }`,
      idParam
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
    profile_pic,
    email,
    friends,
  } = user;
  try {
    const newUser = await db.one(
      "INSERT INTO users (stytch_id, first_name, middle_name, last_name, username, about_me, interests, intra_extraversion, phone_number, profile_pic, email, friends) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
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
        profile_pic,
        email,
        friends,
      ]
    );
    console.log(newUser);
    return newUser;
  } catch (error) {
    throw error;
  }
};

// DELETE USER
const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      id
    );
    return deletedUser;
  } catch (error) {
    return error;
  }
};

// UPDATE USER
const updateUser = async (idParam, user) => {
  const {
    first_name,
    middle_name,
    last_name,
    username,
    about_me,
    interests,
    intra_extraversion,
    phone_number,
    email,
    friends,
  } = user;
  try {
    const updatedUser = await db.one(
      `UPDATE users SET first_name=$1, middle_name=$2, last_name=$3, username=$4, about_me=$5, interests=$6, intra_extraversion=$7, phone_number=$8, email=$9, friends=$10 WHERE ${
        idParam.includes("user") ? "stytch_id=$11" : "id=$11"
      } RETURNING *`,
      [
        first_name,
        middle_name,
        last_name,
        username,
        about_me,
        interests,
        intra_extraversion,
        phone_number,
        email,
        friends,
        idParam,
      ]
    );

    return updatedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addUsersFriends = async (user_id, friend_id) => {
  const addUsersFriends = await db.one(
    `INSERT INTO user_friends (user_id, friend_id)
        VALUES ($1, $2) RETURNING *;`,
    [user_id, friend_id]
  );
};

//UPDATE PROFILE PIC FOR USER
const updateUserPicture = async (id, path) => {
  const updateUserPicture = await db.one(
    `UPDATE users SET profile_pic=$1 WHERE ${
      id.includes("user") ? "stytch_id=$2" : "id=2"
    } RETURNING *;`,
    [path, id]
  );

  return updateUserPicture;
};

const updateUserCoverPicture = async (id, path) => {
  const updateCoverPicture = await db.one(
    "UPDATE users SET cover_photo=$1 WHERE stytch_id=$2 RETURNING *",
    [path, id]
  );

  return updateCoverPicture;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updateUserPicture,
  updateUserCoverPicture,
};
