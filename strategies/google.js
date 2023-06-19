const passport = require("passport")
const googleOauth = require("passport-google-oauth20")
const path = require('path');
const fs = require('fs');
const configPath = path.join(__dirname, '../../secrets/config.json');
const configData = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configData).google;
const jwt = require("../controllers/jwtControl")
const secrets = require("../controllers/secretControl");
const secret_name = "prod/app/google"

const configurePassport = async () => {
    const secret = await secrets.retreiveSecret(secret_name);
    passport.use(new googleOauth.Strategy({
        clientID: secret.clientID,
        clientSecret: secret.clientSecret,
        callbackURL: secret.callbackURL,
        scope: ["email"]
    },async (accessToken,refreshToken,profile,done) =>{
        console.log(profile.emails[0].value);
        const token = await jwt.getToken(profile.emails[0].value)
        done(null, token)
    
    }))
}


module.exports = {configurePassport}

