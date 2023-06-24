const express = require("express");
const loginRouter = express.Router();
const jwt = require("../controllers/jwtControl");
const email = require("../controllers/mailController");

loginRouter.post("/token", async function (req, res) {
  const username = req.body.email;
  const socialLogin = req.body.socialLogin
  const token = await jwt.getToken(username);
  if (token && !socialLogin) {
    await email.sendLoginEmail(username, token);
    res.json(null)
  }else if(token){
    res.json(token);
  }
  
});

loginRouter.post("/verify", async function (req, res) {
  const token = req.body.token;
  if ((await jwt.verifyToken(token)) === true) {
    res.json(true)
  }else{
    res.json(false);
  }
  
});

module.exports = loginRouter;
