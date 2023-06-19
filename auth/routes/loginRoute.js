const express = require("express");
const loginRouter = express.Router();
const jwt = require("../../resource/controllers/jwtControl");
const email = require("../controllers/mailController");

loginRouter.post("/token", async function (req, res) {
  console.log("Hit token");
  const username = req.body.email;
  console.log(username);
  const token = await jwt.getToken(username);
  if (token) {
    await email.sendLoginEmail(username, token);
  }

  res.json(token);
});

loginRouter.post("/verify", async function (req, res) {
  console.log("Hit verify");
  const token = req.body.token;
  console.log(token);
  if ((await jwt.verifyToken(token)) === true) {
  }
  res.json(true);
});

module.exports = loginRouter;
