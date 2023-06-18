const path = require('path')
const fs = require("fs");
const configPath = path.join(__dirname, '../../secrets/config.json');
const configData = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configData).email;
const nodemailer = require('nodemailer');
const jwt = require("./jwtControl")
console.log("mail config")
console.log(config)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: config.username,
      pass: config.password
    },
  });


const sendLoginEmail = async (email, token) => {
    const mailOptions = {
        from: config.username,
        to: email,
        subject: 'Hello from Crosses',
        text: jwt.generateJwtLink(token),
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}

module.exports = {sendLoginEmail}