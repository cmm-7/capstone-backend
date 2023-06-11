const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require("fs")



const storage = multer.diskStorage({
  destination: path.join(__dirname, '../files/'), // Specify the directory where the file will be saved
  filename: (req, file, cb) => {
    // Generate a unique filename by appending a timestamp to the original file name
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit the file size to 10MB
});

const users = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updateUserPicture

} = require("../queries/users");
const { profile } = require('console');

// INDEX
users.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  console.log(allUsers);
  if (Array.isArray(allUsers)) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
});

// SHOW
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// CREATE
users.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// Update profile route
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3333';

users.post('/:id/upload', upload.single('profile_pic'), async (req, res) => {
  const { id } = req.params;
  if (!req.file) {
    // If no file is provided in the request
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Access the uploaded file using req.file
  const uploadedFile = req.file.filename;

  // Process the file as needed (e.g., save file path to the database) 
  const filePath = `/files/${uploadedFile}`; // Define the file path

  console.log(uploadedFile);
  const staticUrl = `${frontendURL}${filePath}`;
  const updatePicture = await updateUserPicture(id, staticUrl)
  console.log(updatePicture)
  res.json( updatePicture );
  
});




// UPDATE
users.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {

    const updatedUser = await updateUser(id, req.body);
    res.status(200).json(updatedUser);
    console.log(updateUser)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Bad Request" });
  }
});


// DELETE
users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  if (deletedUser.id) {
    res.status(200).json(deletedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// // Update profile route
// users.post('/:id/upload', upload.single('profile_pic'), (req, res) => {
//   if (!req.file) {
//     // If no file is provided in the request
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   // Access the uploaded file using req.file
//   const uploadedFile = req.file.filename;

//   // Process the file as needed (e.g., save file path to the database) 
//   const filePath = `/uploads/${uploadedFile}`; // Define the file path

//   console.log(uploadedFile);

//   fs.rename(`./uploads/${req.file.filename}`, `.${filePath}`, function(err) {
//     if (err) {
//       // Handle the error appropriately
//       console.error(err);
//       return res.status(500).json({ error: 'Error occurred during file renaming' });
//     }

//     console.log("File uploaded successfully");

//     // Return a response with the file path
//     res.json({ filename: filePath, size: uploadedFile.size });
//   });
// });

module.exports = users;
