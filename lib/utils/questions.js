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
            'Quit'
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
        message: 'What is the ID number of the manager of the new employee (Leave empty for no manager):'
    }
]

const newDepartment = [
    {
        type: 'input',
        name: 'name',
        message: 'What is name of the new department:'
    }
]

const updateEmployee = [
    {
        type: 'input',
        name: 'id',
        message: 'What is the ID number of the employee you are updating:'
    },
    {
        type: 'input',
        name: 'updateRole',
        message: 'What will the employees new role be:'
    }
]

// Exports questions object to be imported
module.exports = {questions, updateEmployee};