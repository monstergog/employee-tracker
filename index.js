const mysql = require('mysql2');
const inquirer = require('inquirer');
const questions = require('./lib/utils/questions.js')
const dbQuery = require('./lib/utils/dbquery.js')
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

// Function to prompt user for input and sent to be written
async function init() {
  for (let i = 0; i < 3; i++) {
    await inquirer.prompt(questions)
    .then(((data) => {
      db.query('SELECT * FROM employees', function (err, results) {
        console.log(results);
      });
    }))
  }
};

init();