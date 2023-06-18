const sql = require('mssql');
const path = require('path');
const fs = require('fs');
const configPath = path.join(__dirname, '../../secrets/config.json');
const configData = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configData).database;
console.log("config for DB:",config);
const pool = new sql.ConnectionPool(config);

async function executeQuery(sqlQuery,parameters) {
    try {
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

