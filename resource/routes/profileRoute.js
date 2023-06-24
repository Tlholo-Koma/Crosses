const express = require("express");
const path = require("path");
const profileRouter = express.Router();
const auth = require("../controllers/authControl");
const { default: axios } = require("axios");


profileRouter.get("/",auth.validateAuth,async function (req,res) {
  res.sendFile(path.join(__dirname,"../pages/profile.html"));
});

profileRouter.post("/user",auth.validateAuth,async function (req,res) {
  console.log("we hit this route")
  try{
    const requestData = {
      token: req.body.token
      // other data you want to include in the request body
    };
    const response = await axios.post(
      `${process.env.AUTHSERVER}/login/user`,
      requestData
    );
    const user = response.data;
    console.log("What we got back from auth server")
    console.log(user);
    res.json(user)
    // Process the response data here
  } catch (error) {
    console.error(error);
    // Handle the error here
    res.json(null)
  }
});

module.exports = profileRouter;