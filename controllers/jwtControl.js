const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const db = require("../controllers/dbControl")

const getToken = async (user) => {
  const privateKey = fs.readFileSync(
    path.join(__dirname, "../../secrets/private.key"),
    'utf8'
  );
  const query = "SELECT COUNT(*) AS count FROM USERS WHERE user_email = @user_email";
  let result = null;
  try{
    result = await db.executeQuery(query, { user_email: user.toLowerCase() });
  }catch{
    console.log("Catching a query we unexpected behavior")
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

const verifyToken = (token) => {
  const publicKey = fs.readFileSync(
    path.join(__dirname, "../../secrets/public.key"),
    'utf8'
  );

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
