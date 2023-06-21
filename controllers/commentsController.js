const express = require("express");
const comments = express.Router();
const {
  getComment,
  createComment,
  deleteComment,
  updateComment,
} = require("../queries/comments");

// INDEX

// comments.get("/", async (req, res) => {
//     const allComments = await getAllComments();
//     console.log(allComments);
//     if(Array.isArray(allComments)){
//         res.status(200).json(allComments);
//     } else {
//         res.status(500).json({ error: "server error, can't find comments"})
//     }
// })

// SHOW
// comments.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const comment = await getComment(id);
//     if (comment) {
//         res.json(Comment);
//     } else {
//         res.status(404).json({ error: "not found"})
//     }
// })

// DELETE
comments.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedComment = await deleteComment(id);
  if (deletedComment.id) {
    res.status(200).json(deletedComment);
  } else {
    res.status(400).json("Comment not found");
  }
});

// UPDATE
comments.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedComment = await updateComment(id, req.body);
  res.status(200).json(updatedComment);
});

module.exports = comments;
