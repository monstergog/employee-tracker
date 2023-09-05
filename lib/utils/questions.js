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

// Exports questions object to be imported
module.exports = { questions };