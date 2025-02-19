const inquirer = require('inquirer');
const db = require('../db/queries');

const mainMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit'
      ]
    }
  ]).then(({ action }) => {
    switch (action) {
      case 'View All Departments':
        db.viewAllDepartments().then(res => console.table(res.rows)).finally(mainMenu);
        break;
      case 'View All Roles':
        db.viewAllRoles().then(res => console.table(res.rows)).finally(mainMenu);
        break;
      case 'View All Employees':
        db.viewAllEmployees().then(res => console.table(res.rows)).finally(mainMenu);
        break;
      case 'Add Department':
        inquirer.prompt({ type: 'input', name: 'name', message: 'Department Name:' })
          .then(({ name }) => db.addDepartment(name))
          .then(() => console.log('Department added.'))
          .finally(mainMenu);
        break;
      case 'Add Role':
        inquirer.prompt([
          { type: 'input', name: 'title', message: 'Role Title:' },
          { type: 'input', name: 'salary', message: 'Salary:' },
          { type: 'input', name: 'departmentId', message: 'Department ID:' }
        ]).then(({ title, salary, departmentId }) => db.addRole(title, salary, departmentId))
          .then(() => console.log('Role added.'))
          .finally(mainMenu);
        break;
      case 'Add Employee':
        inquirer.prompt([
          { type: 'input', name: 'firstName', message: "Employee's First Name:" },
          { type: 'input', name: 'lastName', message: "Employee's Last Name:" },
          { type: 'input', name: 'roleId', message: 'Role ID:' },
          { type: 'input', name: 'managerId', message: "Manager's ID (if none, leave blank):" }
        ]).then(({ firstName, lastName, roleId, managerId }) =>
          db.addEmployee(firstName, lastName, roleId, managerId || null))
          .then(() => console.log('Employee added.'))
          .finally(mainMenu);
        break;
      case 'Update Employee Role':
        inquirer.prompt([
          { type: 'input', name: 'employeeId', message: "Employee's ID to Update:" },
          { type: 'input', name: 'newRoleId', message: 'New Role ID:' }
        ]).then(({ employeeId, newRoleId }) =>
          db.updateEmployeeRole(employeeId, newRoleId))
          .then(() => console.log('Employee role updated.'))
          .finally(mainMenu);
        break;
      case 'Exit':
        process.exit();
    }
  });
};

module.exports = mainMenu;
