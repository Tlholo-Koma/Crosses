const jwt = require("jsonwebtoken");
let privateKey = null;
let publicKey = null;
const local = require("./localControl");

const getToken = async (user) => {
  if (privateKey === null) {
    privateKey = Buffer.from(process.env.PRIVATEKEY, "base64").toString(
      "ascii"
    );
  }

  const signOptions = {
    issuer: "Xand0",
    subject: "Auth",
    audience: "user",
    expiresIn: "1h",
    algorithm: "RS256",
  };

  const token = jwt.sign(
    { email: user },
    privateKey,
    signOptions // Include algorithm option here
  );
  return token;
};

const verifyToken = async (token) => {
  if (publicKey === null) {
    publicKey = Buffer.from(process.env.PUBLICKEY, "base64").toString("ascii");
  }

  const verifyOptions = {
    issuer: "Xand0",
    subject: "Auth",
    audience: "user",
    expiresIn: "1h",
    algorithm: ["RS256"],
  };

  try {
    const decoded = jwt.verify(token, publicKey, verifyOptions);
    //replace later with better stuff
    if (decoded.iss === "Xand0") {
      return true;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
  return false;
};

const getEmailFromToken = async (token) => {
  if (publicKey === null) {
    publicKey = Buffer.from(process.env.PUBLICKEY, "base64").toString("ascii");
  }

  const verifyOptions = {
    issuer: "Xand0",
    subject: "Auth",
    audience: "user",
    expiresIn: "1h",
    algorithm: ["RS256"],
  };

  try {
    const decoded = jwt.verify(token, publicKey, verifyOptions);
    //replace later with better stuff
    if (decoded.iss === "Xand0" && decoded.aud == "user") {
      return decoded.email;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
  return false;
};

const generateJwtLink = (token) => {
  const encodedToken = encodeURIComponent(token);
  const link = `${process.env.EMAILLINK}/login?token=${encodedToken}`;
  return link;
};

module.exports = { getToken, verifyToken, generateJwtLink, getEmailFromToken };
