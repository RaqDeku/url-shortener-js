const mysql = require("mysql2");

const dbPool = mysql
  .createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

module.exports = { dbPool };
