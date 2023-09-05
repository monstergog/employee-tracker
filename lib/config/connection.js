const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.dbusername,
      password: process.env.dbpassword,
      database: process.env.database
    },
    console.log(`Connected to the registrar_db database.`)
  );

module.exports = db;