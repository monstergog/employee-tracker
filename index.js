const mysql = require('mysql2');
const inquirer = require('inquirer');
const questions = require('./lib/utils/questions.js')
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'root',
    user: process.env.username,
    password: process.env.password,
    database: process.env.database
  },
  console.log(`Connected to the registrar_db database.`)
);

// Function to prompt user for input and sent to be written
function init() {
    inquirer.prompt(questions)
    .then(((data) => {
      db.query('SELECT * FROM employees', function (err, results) {
        console.log(results);
      });
    }))
}

init();