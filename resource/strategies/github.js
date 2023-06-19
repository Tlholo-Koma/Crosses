const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const jwt = require("../controllers/jwtControl");

const configurePassport = async () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUBCLIENTID,
        clientSecret: process.env.GITHUBCLIENTSECRET,
        callbackURL: process.env.GITHUBCALLBACKURL,
        scope: ['user:email']
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile.emails[0].value);
        const token = await jwt.getToken(profile.emails[0].value)
        done(null, token);
      }
    )
);
}

module.exports = {configurePassport}
