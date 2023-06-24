const express = require("express");
const passport = require("passport");
const path = require("path");
const loginRouter = express.Router();
const auth = require("../controllers/authControl");
const { default: axios } = require("axios");

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
    failureRedirect: `/login`,
    session: false,
  }),
  async (req, res) => {
    
    const email = req.user;
    try {
      await auth.checkRegistration(email)
      const requestData = {
        email: email,
        socialLogin: true,
        // other data you want to include in the request body
      };
      const response = await axios.post(
        `${process.env.AUTHSERVER}/login/token`,
        requestData
      );
      const token = response.data;
      res.redirect(`/login?token=${token}`);
      // Process the response data here
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  }
);

loginRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

loginRouter.get(
  "/github/redirect",
  passport.authenticate("github", {
    failureRedirect: `/login`,
    session: false,
  }),
  async (req, res) => {
    const email = req.user;
    try {
      await auth.checkRegistration(email)
      const requestData = {
        email: email,
        socialLogin: true,
        // other data you want to include in the request body
      };
      const response = await axios.post(
        `${process.env.AUTHSERVER}/login/token`,
        requestData
      );
      const token = response.data;
      res.redirect(`/login?token=${token}`);
      // Process the response data here
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  }
);

loginRouter.post("/token", async function (req, res) {
  console.log("Hit token");
  const username = req.body.email;
  console.log(username);
  await auth.checkRegistration(username)
  try {
    if(!username){
      res.send(400)
    }
    const requestData = {
      email: username,
      socialLogin: false,
      // other data you want to include in the request body
    };

    const response = await axios.post(
      `${process.env.AUTHSERVER}/login/token`,
      requestData
    );
    const token = response.data;
    if (token === null) {
      res.send(200);
    }
  } catch (error) {
    console.error(error);
    // Handle the error here
    res.send(500);
  }
});

loginRouter.post("/verify", async function (req, res) {
  console.log("Hit token");
  const origin = req.headers.origin;
  console.log(origin)
  const token = req.body.token;
  console.log(token);
  try {
    const requestData = {
      token: token
      // other data you want to include in the request body
    };
    const response = await axios.post(
      `${process.env.AUTHSERVER}/login/verify`,
      requestData
    );
    const result = response.data;
    if (result === true) {
      res.send(200);
    }else{
      res.redirect("/login")
    }
  } catch (error) {
    console.error(error);
    // Handle the error here
    res.send(500);
  }
});

module.exports = loginRouter;
