DROP DATABASE IF EXISTS registrar_db;
CREATE DATABASE registrar_db;

USE registrar_db

CREATE TABLE department (
    id INT NOT NULL,
    PRIMARY KEY (id),
    name VARCHAR(30)
);

CREATE TABLE role {
    id INT NOT NULL,
    PRIMARY KEY (id),
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL

}

CREATE TABLE employee (
    id INT NOT NULL,
    PRIMARY KEY (id),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY (role_id)
    REFERENCES (id)
    ON DELETE SET NULL,
    manager_id INT
)