const sql = require("mssql");
let pool = null;
let config = null;

async function executeQuery(sqlQuery, parameters) {
  try {
    if (pool === null) {
      let config = {
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        server: process.env.DBSERVER,
        database: process.env.DBDATABASE,
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      };
      pool = new sql.ConnectionPool(config);
    }
    let result = undefined;
    // Check if the connection pool is already connected
    if (!pool.connected) await pool.connect();
    const request = new sql.Request(pool);
    for (const [key, value] of Object.entries(parameters)) {
      request.input(key, value);
    }
    result = await request.query(sqlQuery);
    await pool.close();
    return result.recordset;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

module.exports = { executeQuery };
