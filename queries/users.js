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
const getUser = async (id) => {
  try {
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE id=$1",
      id
    );
    return user;
  } catch (error) {
    return error;
  }
};

const getUserStytchID = async (stytch_id) => {
  try {
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE stytch_id=$1",
      stytch_id
    );
    return user
  }
  catch (error) {
    return error
  }
}

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
    cover_photo
  } = user;
  try {
    const newUser = await db.one(
      "INSERT INTO users (stytch_id, first_name, middle_name, last_name, username, about_me, interests, intra_extraversion, phone_number, profile_pic, cover_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
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
        cover_photo
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
const updateUser = async (id, user) => {
  const {
    first_name,
    middle_name,
    last_name,
    username,
    about_me,
    interests,
    intra_extraversion,
    phone_number,
    profile_pic,
    cover_photo
  } = user;
  try {
    const updatedUser = await db.one(
      "UPDATE users SET first_name=$1, middle_name=$2, last_name=$3, username=$4, about_me=$5, interests=$6, intra_extraversion=$7, phone_number=$8, profile_pic=$9, cover_photo=$10 WHERE id=$11 RETURNING *",
      [
        first_name,
        middle_name,
        last_name,
        username,
        about_me,
        interests,
        intra_extraversion,
        phone_number,
        profile_pic,
        cover_photo,
        id,
      ]
    );

    return updatedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//UPDATE PROFILE PIC FOR USER

const updateUserPicture = async (id, profilePicPath) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET profile_pic=$1 WHERE id=$2 RETURNING *",
      [profilePicPath, id]
    );

    return updatedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// UPDATE COVER PHOTO FOR USER
//UPDATE PROFILE PIC FOR USER

const updateUserCoverPicture = async (id, coverPhotoPicPath) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET cover_photo=$1 WHERE id=$2 RETURNING *",
      [coverPhotoPicPath, id]
    );

    return updatedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updateUserPicture,
  getUserStytchID,
  updateUserCoverPicture
};
