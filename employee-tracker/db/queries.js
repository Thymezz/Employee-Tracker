const pool = require('./connection');

const viewAllDepartments = () => pool.query('SELECT * FROM department');

const viewAllRoles = () => pool.query(`
  SELECT role.id, role.title, department.name AS department, role.salary
  FROM role
  JOIN department ON role.department_id = department.id
`);

const viewAllEmployees = () => pool.query(`
  SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary,
         CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role ON e.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee m ON e.manager_id = m.id
`);

const addDepartment = (name) => pool.query('INSERT INTO department (name) VALUES ($1)', [name]);

const addRole = (title, salary, departmentId) =>
  pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);

const addEmployee = (firstName, lastName, roleId, managerId) =>
  pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
             [firstName, lastName, roleId, managerId]);

const updateEmployeeRole = (employeeId, newRoleId) =>
  pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
