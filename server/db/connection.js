const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
});

dbConnect.connect((err) => {
  if (err) {
    dbConnect.end();
  }
});

module.exports = dbConnect;