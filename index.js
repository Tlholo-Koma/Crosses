const express = require("express")
const bodyParser = require('body-parser');
const passport = require("passport")
const cors = require('cors');
const googleStrat = require("./strategies/google");
const githubStrat = require("./strategies/github")
const port = process.env.PORT || 3000;
const app = express();
const loginRoutes = require("./routes/loginRoute")

app.use(passport.initialize())
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('styles'));
app.use(express.static('scripts'));
app.use("/login",loginRoutes)

app.listen(port, () =>{
    console.log(`listening on http://localhost:${port}`);
})