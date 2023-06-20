const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

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
        const email = profile.emails[0].value
        done(null, email)
      }
    )
);
}

module.exports = {configurePassport}
