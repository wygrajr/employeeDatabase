// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');


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

getDepartments().then(result => {
  console.table(result)
})


