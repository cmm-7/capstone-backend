const express = require("express")
const userEvents = express.Router()
const {
    createUserEvent,
    getUserEvents,
    getUserEventById,
    updateUserEvent,
    deleteUserEvent,
} = require("../queries/userEvents")

//INDEX
