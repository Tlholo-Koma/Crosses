const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const path = require("path");
const fs = require("fs");
const configPath = path.join(__dirname, "../../secrets/config.json");
const configData = fs.readFileSync(configPath, "utf8");
const config = JSON.parse(configData).github;
const jwt = require("../controllers/jwtControl");

passport.use(
  new GitHubStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
      scope: ['user:email']
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile.emails[0].value);
      const token = await jwt.getToken(profile.emails[0].value)
      done(null, token);
    }
  )
);
