const db = require('./lib/config/connection.js')
const inquirer = require('inquirer');
const {questions, updateEmployee} = require('./lib/utils/questions.js');
require('console.table');

function viewAllEmployees() {
  db.query(`SELECT
  e1.id,
  e1.first_name AS first_name,
  e1.last_name AS last_name,
  r.title,
  d.name AS department,
  r.salary,
  CONCAT(e2.first_name, ' ', e2.last_name) AS manager
  FROM employees AS e1
  INNER JOIN roles AS r ON e1.role_id = r.id
  LEFT JOIN departments AS d ON r.department_id = d.id
  LEFT JOIN employees AS e2 ON e1.manager_id = e2.id;`,
   (err, results) => {
    if (err) {
      console.error('Error finding employees:', err);
      return;
    }
    console.log();
    console.table(results);
    init();
    });
}

function viewAllRoles() {
  db.query(`SELECT
  r.id,
  r.title,
  d.name AS department,
  r.salary
  FROM roles AS r
  INNER JOIN departments AS d ON r.department_id = d.id`,
  (err, results) => {
    if (err) {
      console.error('Error finding roles:', err);
      return;
    }
    console.log();
    console.table(results);
    init();
    });
}

function viewAllDepartments() {
  db.query(`SELECT * FROM departments`, (err, results) => {
    if (err) {
      console.error('Error finding departments:', err);
      return;
    }
    console.log();
    console.table(results);
    init();
    });
}

function addDepartment(data) {
  db.query(`INSERT INTO departments (name)
  VALUES (?)`,
  [data.name],
  (err, results) => {
    if (err) {
      console.error('Error adding department:', err);
      return;
    }
    console.log(`New Department "${data.name}" Added`)
    init();
  });
}

function addRole(data) {
  db.query(`INSERT INTO roles (title, salary, department_id)
  VALUES (? , ? , ?)`,
  [data.title, data.salary, data.departmentID],
  (err, results) => {
    if (err) {
      console.error('Error adding role:', err);
      return;
    }
    console.log(`New Role "${data.title}" Added`)
    init()
  });
}

function addEmployee(data) {
  db.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`,
    [data.firstName, data.lastName, data.roleID, data.managerID],
    (err, results) => {
      if (err) {
        console.error('Error adding employee:', err);
        return;
      }
      console.log(`New Role "${data.firstName + " " + data.lastName}" Added`);
      init();
    }
  );
}

function updateEmployeeData(data) {
  db.query(
    `UPDATE employees
    SET role_id = ${data.updateRole}
    WHERE id = ${data.id}`,
    (err, results) => {
      if (err) {
        console.error('Error updating employee:', err);
        return;
      }
      console.log('Employee Updated');
      init();
    }
  );
}

function getDepartments() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, name FROM departments`, (err, results) => {
      if (err) {
        console.error(`Error finding departments`);
        reject(err);
      } else {
        const columnData = results.map(({id, name}) => ({
          name: name,
          value: id
        }));
        resolve(columnData);
      }
    });
  });
}

function getRoles() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, title FROM roles`, (err, results) => {
      if (err) {
        console.error(`Error finding departments`);
        reject(err);
      } else {
        const columnData = results.map(({id, title}) => ({
          name: title,
          value: id
        }));
        resolve(columnData);
      }
    });
  });
}

function getManagers() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, first_name, last_name FROM employees`, (err, results) => {
      if (err) {
        console.error(`Error finding departments`);
        reject(err);
      } else {
        const columnData = results.map(({id, first_name, last_name}) => ({
          name: first_name + ' ' + last_name,
          value: id
        }));
        resolve(columnData);
      }
    });
  });
}

// Function to prompt user for input and sent to be written
async function init() {
  await inquirer.prompt(questions)
  .then(((data) => {
    switch(data.options) {
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add Employee':
        (async () => {
          try {
            let roles = await getRoles();
            let managers = await getManagers();
            managers.unshift({ name: 'None', value: null})
            inquirer.prompt([
              {
                  type: 'input',
                  name: 'firstName',
                  message: 'What is FIRST name of the new Employee:'
              },
              {
                  type: 'input',
                  name: 'lastName',
                  message: 'What is LAST name of the new employee:'
              },
              {
                  type: 'list',
                  name: 'roleID',
                  message: 'What is role of the new employee:',
                  choices: roles
              },
              {
                  type: 'list',
                  name: 'managerID',
                  message: 'Who is the manager of this new employee:',
                  choices: managers
              }
          ]).then((employeeData) => addEmployee(employeeData));
          }
          catch (error) {
            console.error(error);
          }
        })();
        break;
      case 'Update Employee Role':
        inquirer.prompt(updateEmployee).then((updateData) => updateEmployeeData(updateData));
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
        case 'Add Role':
          (async () => {
            try {
              let departments = await getDepartments('name', 'departments');
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'title',
                  message: 'What is the title of the new role:'
                },
                {
                  type: 'input',
                  name: 'salary',
                  message: 'What is the salary of the new role:'
                },
                {
                  type: 'list',
                  name: 'departmentID',
                  message: 'What is the department of the new role:',
                  choices: departments
                }
              ]).then((roleData) => addRole(roleData));
            } catch (error) {
              console.error(error);
            }
          })();
          break;
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'Add Department':
        inquirer.prompt(newDepartment).then((departmentData) => addDepartment(departmentData));
        break;
      case 'Quit':
        db.end();
        break;
    }
  }))
};

init();