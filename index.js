// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'root',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

async function getDepartments() {
  const sql = `SELECT * FROM employees_db.departments;`

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(result)
    })
  })
}

async function getRoles() {
  const sql = `SELECT * FROM employees_db.roles;`

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(result)
    })
  })
}

async function getEmployeess() {
  const sql = `SELECT * FROM employees_db.employees;`

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(result)
    })
  })
}

async function addDepartment(departmentName) {
  const sql = `INSERT INTO departments (department_name) VALUES (?)`;
  const params = [departmentName];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(result)
    })
  })
}

async function addRole(title,salary,departmentId) {
  console.log(`${title} ${salary} ${departmentId}`)
  const sql = `INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)`;
  const params = [title,salary,departmentId];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(result)
    })
  })
}

async function addEmployees(firstName,lastName,roleId,managerId) {
  const sql = `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
  const params = [firstName,lastName,roleId,managerId];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(result)
    })
  })
}

async function updateEmployee(employeeId, roleId) {
  const sql = `UPDATE employees_db.employees SET role_id = ? WHERE id = ?;`;
  const params = [roleId, employeeId];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(result)
    })
  })
}

async function runLoop() {
  while (true) {
    await inquirer
    .prompt([
      {
        type: 'list',
        message: 'Select an Option',
        name: 'option',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
      },
    ])
    .then(async (data) => {
      switch (data.option) {
        case "view all departments":
            console.table(await getDepartments());
            break;
        case "view all roles":
            console.table(await getRoles());
            break;
        case "view all employees":
            console.table(await getEmployeess());
            break;
        case "add a department":
          await inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the name of department',
              name: 'departmentName',
            },
          ])
          .then(async (data) => {
            await addDepartment(data.departmentName);
          });
          break;
        case "add a role":
          await inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the title of role',
              name: 'titleName',
            },
            {
              type: 'input',
              message: 'Enter the salary of role',
              name: 'salary',
            },
            {
              type: 'input',
              message: 'Enter the department ID of role',
              name: 'departmentId',
            },
          ])
          .then(async (data) => {
            await addRole(data.titleName,data.salary,data.departmentId);
          });
          break;
        case "add an employee":
          await inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the first name',
              name: 'firstName',
            },
            {
              type: 'input',
              message: 'Enter the last name',
              name: 'lastName',
            },
            {
              type: 'input',
              message: 'Enter the role ID',
              name: 'roleId',
            },
            {
              type: 'input',
              message: 'Enter the manger ID',
              name: 'managerId',
            },
          ])
          .then(async (data) => {
            await addEmployees(data.firstName,data.lastName,data.roleId,data.managerId);
          });
          break;
        case "update an employee role":
          await inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the employee ID',
              name: 'employeeId',
            },
            {
              type: 'input',
              message: 'Enter the role ID',
              name: 'roleId',
            },
          ])
          .then(async (data) => {
            await updateEmployee(data.employeeId,data.roleId);
          });
          break;
    }})
  }
}

runLoop()




