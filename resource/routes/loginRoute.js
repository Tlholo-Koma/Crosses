const express = require("express");
const passport = require("passport");
const path = require("path");
const loginRouter = express.Router();

loginRouter.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, "../pages/login.html"));
});

loginRouter.get(
  "/google",
  passport.authenticate("google"),
  async function (req, res) {
    res.send(200);
  }
);
loginRouter.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = req.user;
    res.redirect(`/login?token=${token}`);
  }
);

loginRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

loginRouter.get(
  "/github/redirect",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = req.user;
    res.redirect(`/login?token=${token}`);
  }
);

module.exports = loginRouter;
