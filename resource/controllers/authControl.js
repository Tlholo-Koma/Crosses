const axios = require('axios');


const validateAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Assuming the header value is in the format: Bearer <token>
    const queryToken = req.query.token;

    const requestData = {
      token: token || queryToken,
      // other data you want to include in the request body
    };

    const response = await axios.post(`${process.env.AUTHSERVER}/login/verify`, requestData);
    console.log("WHAT WE GOT BACK FROM VERIFY")
    console.log(response.data);

    if (response.data === true) {
      next();
    } else {
      return res.redirect('/login');
    }
    // Process the response data here
  } catch (error) {
    console.error(error);
    return res.redirect('/login');
    // Handle the error here
  }
}

module.exports = {validateAuth}