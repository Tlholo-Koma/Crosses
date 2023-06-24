const axios = require("axios");
const DB = require("./dbControl")

const validateAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Assuming the header value is in the format: Bearer <token>
    const queryToken = req.query.token;

    const requestData = {
      token: token || queryToken,
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
  console.log("Checking user to see if it is reg'd")
  const query = "SELECT COUNT(*) AS count FROM USERS WHERE user_email = @user_email";
  let result = null;
  try{
     result = await DB.executeQuery(query, { user_email: email.toLowerCase() });
     console.log("DB result", result);
     if(result[0]){
        if(result[0].count === 0){
          const insertQuery = "INSERT INTO USERS(user_email) VALUES (@user_email)"
           result = await DB.executeQuery(insertQuery, { user_email: email.toLowerCase()});
        }
     }
   }catch(e){
     console.log("Catching a query we unexpected behavior")
  }
  
}

module.exports = { validateAuth, checkRegistration };
