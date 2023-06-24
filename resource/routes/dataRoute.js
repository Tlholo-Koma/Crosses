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


dataRouter.post('/register', async (req,res) =>{
    const query = "SELECT COUNT(*) AS count FROM USERS WHERE user_email = @user_email";
  let result = null;
  try{
     result = await db.executeQuery(query, { user_email: user.toLowerCase() });
   }catch(e){
     console.log("Catching a query we unexpected behavior")
  }
  if(result[0]){
       console.log("DB result", result[0]);
  }
})

module.exports = dataRouter;
