const express = require("express");
const path = require("path");
const profileRouter = express.Router();
const auth = require("../controllers/authControl");
const { default: axios } = require("axios");
const { generateUsername } = require("../controllers/usernameControl");
const DB = require("../controllers/dbControl")


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

profileRouter.post("/username",auth.validateAuth,async function (req,res) {
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
    const query = "SELECT user_name FROM USERS WHERE user_email = @email;"
    let result = await DB.executeQuery(query, {email: user});
    let username = result[0].user_name;
    console.log(username)
    res.json(username)
    // Process the response data here
  } catch (error) {
    console.error(error);
    // Handle the error here
    res.json(null)
  }
});


profileRouter.post("/generateUsername", auth.validateAuth,async function (req,res) {
  try{
    const email = await auth.getUser(req.body.token)
    const user = await generateUsername();
    console.log("step 2: ")
    console.log("new username: " + user)
    const query = `UPDATE USERS
    SET user_name = @username
    WHERE user_email = @email;`
    await DB.executeQuery(query, {username: user, email: email});
    console.log("step 3: ")
    console.log("db success");
    res.json(user);
  }catch(e){
    console.log(e);
    res.send(500)
  }
});

module.exports = profileRouter;