const nodemailer = require("nodemailer");
const secrets = require("./secretControl");
const jwt = require("./jwtControl");


const sendLoginEmail = async (email, token) => {
  const secret_name = "prod/app/email";
  const secret = await secrets.retreiveSecret(secret_name);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: secret.emailUsername,
      pass: secret.emailPassword,
    },
  });

  const mailOptions = {
    from: secret.emailUsername,
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
