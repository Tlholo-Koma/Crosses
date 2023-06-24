const express = require("express");
const path = require("path");
const historyRouter = express.Router();
const auth = require("../controllers/authControl");

historyRouter.get("/",auth.validateAuth,async function (req,res) {
  res.sendFile(path.join(__dirname, "../pages/history.html"));
});

module.exports = historyRouter; 