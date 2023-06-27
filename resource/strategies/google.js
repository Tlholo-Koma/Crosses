const passport = require("passport")
const googleOauth = require("passport-google-oauth20")

const configurePassport = async () => {
    passport.use(new googleOauth.Strategy({
        clientID: process.env.GOOGLECLIENTID,
        clientSecret: process.env.GOOGLECLIENTSECRET,
        callbackURL: process.env.GOOGLECALLBACKURL,
        scope: ["email"]
    },async (accessToken,refreshToken,profile,done) =>{
        const email = profile.emails[0].value
        done(null, email)
    
    }))
}


module.exports = {configurePassport}

