const mysql = require('mysql2');
const inquirer = require('inquirer');
const {questions, newEmployee, newRole, newDepartment} = require('./lib/utils/questions.js');
require('dotenv').config();
require('console.table');

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

function addDepartment(data) {
  db.query(`INSERT INTO departments (name)
  VALUES ('${data.name}')`,
  function (err, results) {
    console.log('New Department Added')
    init();
  });
}

function addRole(data) {
  db.query(`INSERT INTO roles (title, salary, department_id)
  VALUES (${data.title}, ${data.salary}, ${data.departmentID})`,
  function (err, results) {
    console.log('New Role Added')
    init()
  });
}

function addEmployee(data) {
  db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES (${data.firstName}, ${data.lastName}, ${data.roleID}, ${data.managerID})`,
  function (err, results) {
    console.log('New Employee Added')
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
        inquirer.prompt(newEmployee).then((employeeData) => addEmployee(employeeData));
        break;
      case 'Update Employee Role':
        break;
      case 'View All Roles':
        viewTable('roles');
        break;
      case 'Add Role':
        inquirer.prompt(newRole).then((roleData) => addRole(roleData));
        break;
      case 'View All Departments':
        viewTable('departments');
        break;
      case 'Add Department':
        inquirer.prompt(newDepartment).then((departmentData) => addDepartment(departmentData));
        break;
    }
  }))
};

init();