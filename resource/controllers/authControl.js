const axios = require("axios");
const DB = require("./dbControl");
const { generateUsername } = require("./usernameControl");

const validateAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Assuming the header value is in the format: Bearer <token>
    const queryToken = req.query.token;
    const bodyToken = req.body.token

    const requestData = {
      token: token || queryToken || bodyToken,
      // other data you want to include in the request body
    };

    const response = await axios.post(
      `${process.env.AUTHSERVER}/login/verify`,
      requestData
    );

    if (response.data === true) {
      const username = await axios.post(
        `${process.env.AUTHSERVER}/login/user`,
        requestData
      );
      await checkRegistration(username.data)
      next();
    } else {
      return res.redirect("/login");
    }
    // Process the response data here
  } catch (error) {
    console.error(error);
    return res.redirect("/login");
    // Handle the error here
  }
};

const checkRegistration = async (email) => {

  const query =
    "SELECT COUNT(*) AS count FROM USERS WHERE user_email = @user_email";
  let result = null;
  try {
    result = await DB.executeQuery(query, { user_email: email.toLowerCase()});
    if (result[0]) {
      if (result[0].count === 0) {
        const username = await generateUsername()
        const insertQuery =
          "INSERT INTO USERS(user_email,user_name) VALUES (@user_email,@user_name)";
        result = await DB.executeQuery(insertQuery, {
          user_email: email.toLowerCase(),
          user_name: username.toLowerCase()
        });
      }
    }
  } catch (e) {
    console.log("Catching a query with unexpected behavior");
  }
};

const getUser = async (token) =>{
  try{
    const requestData = {
      token: token
      // other data you want to include in the request body
    };
    const response = await axios.post(
      `${process.env.AUTHSERVER}/login/user`,
      requestData
    );
    const user = response.data;
    return user
    // Process the response data here
  } catch (error) {
    console.error(error);
    // Handle the error here
    return null;
  }
}

module.exports = { validateAuth, checkRegistration, getUser };
