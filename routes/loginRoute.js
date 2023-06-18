const express = require('express');
const passport = require('passport')
const path = require('path');
const loginRouter = express.Router()
const jwt = require("../controllers/jwtControl")
const email = require("../controllers/mailController")

loginRouter.get('/',async function (req, res) {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
})
loginRouter.get('/google',passport.authenticate('google'),async function (req, res) {
    res.send(200);
})
loginRouter.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/login', session: false }),
(req, res) => {
  const token = req.user;
  res.redirect(`/login?token=${token}`);
})

loginRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

loginRouter.get(
  '/github/redirect',
  passport.authenticate('github', { failureRedirect: '/login', session: false}),
  (req, res) => {
    const token = req.user;
    res.redirect(`/login?token=${token}`);
  }
);

loginRouter.post('/token',async function (req, res) {
    console.log("Hit token")
    const username = req.body.email;
    console.log(username);
    const token = await jwt.getToken(username);
    if(token){
        await email.sendLoginEmail(username,token)
    }
    
    res.json(token)
})

loginRouter.post("/verify",async function (req, res) {
    console.log("Hit verify")
    const token = req.body.token;
    console.log(token);
    if(jwt.verifyToken(token) === true){
        
    }
    res.json(true)
} )


module.exports = loginRouter;