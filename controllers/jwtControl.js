const jwt = require("jsonwebtoken");
const secrets = require("./secretControl");
const db = require("../controllers/dbControl")
let privateKey = null;
let publicKey = null;
const secret_name_public = "prod/app/publickey";
const secret_name_pvt = "prod/app/privatekey";

const getToken = async (user) => {
  
  if(privateKey === null){
    privateKey = (await secrets.retreiveSecret(secret_name_pvt));
  }

  const query = "SELECT COUNT(*) AS count FROM USERS WHERE user_email = @user_email";
  let result = null;
  try{
    result = await db.executeQuery(query, { user_email: user.toLowerCase() });
  }catch(e){
    console.log("Catching a query we unexpected behavior")
    console
  }
  if(result[0]){
      console.log("DB result", result[0]);
  }
  

  const signOptions = {
    issuer:  "Xand0",
    subject:  "Auth",
    audience:  "user",
    expiresIn:  "1h",
    algorithm:  "RS256"
   };

  const token = jwt.sign(
    { email: user },
    privateKey,
    signOptions// Include algorithm option here
  );
  return token;
};

const verifyToken = async (token) => {
  if(publicKey === null){
    publicKey = (await secrets.retreiveSecret(secret_name_public));
  }

  const verifyOptions = {
    issuer:  "Xand0",
    subject:  "Auth",
    audience:  "user",
    expiresIn:  "1h",
    algorithm:  ["RS256"]
   };

  try {
    const decoded = jwt.verify(
      token,
      publicKey,
      verifyOptions
    );
    console.log("Token verified:", decoded);
    //replace later with better stuff 
    if(decoded.iss === 'Xand0'){
      return true;
    } 
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
  return false;
};

const generateJwtLink = (token) => {
  const encodedToken = encodeURIComponent(token);
  const link = `http://localhost:3000/login?token=${encodedToken}`;
  return link;
};


module.exports = { getToken, verifyToken, generateJwtLink };
