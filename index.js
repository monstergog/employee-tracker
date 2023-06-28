const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const questions = require('./lib/utils/questions.js');
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

function viewTable(table) {
  db.query(`SELECT * FROM ${table}`, function (err, results) {
    console.log();
    console.table(results);
    init();
    });
}

// Function to prompt user for input and sent to be written
async function init() {
  await inquirer.prompt(questions)
  .then(((data) => {
    switch(data.options) {
      case 'View All Employees':
        viewTable('employees');
        break;
      case 'Add Employee':
        break;
      case 'Update Employee Role':
        break;
      case 'View All Roles':
        viewTable('roles');
        break;
      case 'Add Role':
        break;
      case 'View All Departments':
        viewTable('departments');
        break;
      case 'Add Department':
        break;
    }
  }))
};

init();