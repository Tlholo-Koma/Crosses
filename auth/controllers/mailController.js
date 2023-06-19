const nodemailer = require("nodemailer");
const secrets = require("./secretControl");
const jwt = require("../../resource/controllers/jwtControl");

const sendLoginEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAILUSERNAME,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAILUSERNAME,
    to: email,
    subject: "Hello from Crosses",
    text: jwt.generateJwtLink(token),
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendLoginEmail };
