-- Seeds for the 'department' table
INSERT INTO department (name)
VALUES  ('Sales'),
        ('Marketing'),
        ('Finance');

-- Seeds for the 'role' table
INSERT INTO role (title, salary, department_id)
VALUES  ('Manager', 5000.00, 1),
        ('Salesperson', 3000.00, 1),
        ('Analyst', 4000.00, 2);

-- Seeds for the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, NULL),
        ('Jane', 'Smith', 2, 1),
        ('David', 'Johnson', 2, 1);
