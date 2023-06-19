const sql = require('mssql');
const secrets = require("./secretControl");
let pool = null
let config = null;

async function executeQuery(sqlQuery,parameters) {
    try {
      if(pool === null){
        const secret_name = "prod/app/db";
        const secret = await secrets.retreiveSecret(secret_name);
        let config = {
          user: secret.user,
          password: secret.password,
          server: secret.server,
          database: secret.database,
          options: {
            encrypt: true,
            trustServerCertificate: true
          }
        }
        pool = new sql.ConnectionPool(config)
  
      }
        let result = undefined;
        console.log("Config" + config);
      // Check if the connection pool is already connected
        if (!pool.connected) 
            await pool.connect();
        const request = new sql.Request(pool);
        for (const [key, value] of Object.entries(parameters)) {
          request.input(key, value);
        }
        result = await request.query(sqlQuery);
        await pool.close();
        console.log(result)
        console.log("aaaaaaaaaaaaaaaaaaaaaa");
        return result.recordset;
      } catch (error) {
        console.error("Error executing query:", error);
        throw error;
      }
}

module.exports = {executeQuery}

