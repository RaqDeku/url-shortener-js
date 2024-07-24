import mysql from "mysql2";

export const dbPool = mysql
  .createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();
