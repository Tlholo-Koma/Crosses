const express = require("express");
const loginRouter = express.Router();
const jwt = require("../controllers/jwtControl");
const email = require("../controllers/mailController");

loginRouter.post("/token", async function (req, res) {
  console.log("Hit token");
  const username = req.body.email;
  const socialLogin = req.body.socialLogin
  console.log(username);
  console.log(socialLogin)
  const token = await jwt.getToken(username);
  if (token && !socialLogin) {
    await email.sendLoginEmail(username, token);
    res.json(null)
  }else if(token){
    res.json(token);
  }
  
});

loginRouter.post("/verify", async function (req, res) {
  console.log("Hit verify");
  const token = req.body.token;
  console.log(token);
  if ((await jwt.verifyToken(token)) === true) {
    res.json(true)
  }else{
    res.json(false);
  }
  
});

// loginRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

// loginRouter.get(
// '/github/redirect',
// passport.authenticate('github', { failureRedirect: `${process.env.RESOURCESERVER}/login`, session: false}),
// (req, res) => {
//   const token = req.user;
//   res.redirect(200,`${process.env.RESOURCESERVER}/login?token=${token}`);
// }
// );

module.exports = loginRouter;
