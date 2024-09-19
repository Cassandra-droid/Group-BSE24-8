const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'web_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process if unable to connect to database
  }
  console.log('Database connected');
});

module.exports = db;
