const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "db-backend",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.stack);
//     return;
//   } else {
//     console.log("Database connection successfully.");
//   }
// });

// module.exports = db;

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.getConnection((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  } else {
    console.log("Database connection successfully.");
  }
});

module.exports = connection.promise();