const express = require("express");
const db = require("./db/dbConfig")

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to our capstone project backend")
});

app.get("/db", async (req, res) => {
    let results = await db.any("SELECT * FROM test");
    res.send(results);
})

module.exports = app;