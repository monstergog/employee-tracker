// Prompts made to be used by Inquirer
const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do:',
        choices:
        [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
        ]
    },
]

const newEmployee = [
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
        type: 'input',
        name: 'roleID',
        message: 'What is role ID number of the new employee:'
    },
    {
        type: 'input',
        name: 'managerID',
        message: 'What is the ID number of the manager of the new employee (Enter "NULL" for no manager):'
    }
]

const newRole = [
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
        type: 'input',
        name: 'departmentID',
        message: 'What is the department ID number of the new role:'
    }
]

const newDepartment = [
    {
        type: 'input',
        name: 'name',
        message: 'What is name of the new department:'
    }
]

// Exports questions object to be imported
module.exports = {questions, newEmployee, newRole, newDepartment};