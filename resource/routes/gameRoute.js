const express = require("express");
const path = require("path");
const gameRouter = express.Router();
const auth = require("../controllers/authControl")

gameRouter.get("/",auth.validateAuth, async function (req, res) {
    res.sendFile(path.join(__dirname, "../pages/game.html"));
});

module.exports = gameRouter;