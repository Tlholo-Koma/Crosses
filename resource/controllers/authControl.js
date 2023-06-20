const axios = require('axios');


const validateAuth = async (req, res, next) => {

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Assuming the header value is in the format: Bearer <token>
        const requestData = {
          token: token,
          // other data you want to include in the request body
        };
        const response = await axios.post(`${process.env.AUTHSERVER}/login/verify`, requestData);
        console.log("WHAT WE GOT BACK FROM VERIFY")
        console.log(response.data);
        if(response.data === true){
          next()
        }else{
          return res.status(403).json({ message: 'Invalid token' });
        }
        // Process the response data here
      } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Invalid token' });
        // Handle the error here
      }
}

const googleAuth = async () =>{
    try {
        const response = await axios.get(`${process.env.AUTHSERVER}/login/google`);
        console.log("we got google shit here")
        console.log(response)
        // Process the response data here
      } catch (error) {
        console.error(error);
        // Handle the error here
      }
}

module.exports = {validateAuth, googleAuth}