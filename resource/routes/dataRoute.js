const express = require("express");
const db = require("../controllers/dbControl");
const dataRouter = express.Router();

dataRouter.get("/test", async (req, res) => {
  const query = "SELECT * FROM USERS;";
  try {
    const result = await db.executeQuery(query, {});
    console.log(result);
  } catch (e) {
    console.log("There was an error executing the query: " + e);
  }
});

module.exports = dataRouter;
