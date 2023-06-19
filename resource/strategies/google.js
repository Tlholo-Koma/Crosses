const passport = require("passport")
const googleOauth = require("passport-google-oauth20")
const jwt = require("../controllers/jwtControl")

const configurePassport = async () => {
    passport.use(new googleOauth.Strategy({
        clientID: process.env.GOOGLECLIENTID,
        clientSecret: process.env.GOOGLECLIENTSECRET,
        callbackURL: process.env.GOOGLECALLBACKURL,
        scope: ["email"]
    },async (accessToken,refreshToken,profile,done) =>{
        console.log(profile.emails[0].value);
        const token = await jwt.getToken(profile.emails[0].value)
        done(null, token)
    
    }))
}


module.exports = {configurePassport}

