const express = require("express");
const path = require("path");
const profileRouter = express.Router();
const auth = require("../controllers/authControl");

profileRouter.get("/",auth.validateAuth,async function (req,res) {
  res.sendFile(path.join(__dirname,"../pages/profile.html"));
});

module.exports = profileRouter;