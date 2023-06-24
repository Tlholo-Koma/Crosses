const express = require("express");
const db = require("../controllers/dbControl");
const dataRouter = express.Router();

dataRouter.get("/result-types", async (req, res) => {
  const email = req.params.email;
  const query = `SELECT * FROM LOOKUP_RESULT_TYPES;`;
  try {
    res.send(await db.executeQuery(query, {}));
  } catch (e) {
    console.log("There was an error executing the query: " + e);
  }
});

dataRouter.get("/:email/games", async (req, res) => {
  const email = req.params.email;
  const query = `SELECT GAMES.lookup_result_type_id, description, game_time 
                 FROM GAMES INNER JOIN LOOKUP_RESULT_TYPES 
                 ON GAMES.lookup_result_type_id = LOOKUP_RESULT_TYPES.lookup_result_type_id 
                 WHERE user_id IN 
                 (SELECT user_id FROM USERS WHERE user_email=@email) 
                 ORDER BY game_time DESC;`;
  try {
    res.send(await db.executeQuery(query, { email }));
  } catch (e) {
    console.log("There was an error executing the query: " + e);
  }
});

dataRouter.post("/:email/game", async (req, res) => {
  const email = req.params.email;
  const result_type_id = req.body.id;
  const query = `INSERT INTO GAMES (user_id, lookup_result_type_id)
                 SELECT user_id, @result_type_id FROM USERS
                 WHERE user_email=@email;`;
  try {
    res.send(await db.executeQuery(query, { email, result_type_id }));
  } catch (e) {
    console.log("There was an error executing the query: " + e);
  }
});

dataRouter.post("/register", async (req, res) => {
  const query =
    "SELECT COUNT(*) AS count FROM USERS WHERE user_email = @user_email";
  let result = null;
  try {
    result = await db.executeQuery(query, { user_email: user.toLowerCase() });
  } catch (e) {
    console.log("Catching a query we unexpected behavior");
  }
  if (result[0]) {
    console.log("DB result", result[0]);
  }
});

module.exports = dataRouter;