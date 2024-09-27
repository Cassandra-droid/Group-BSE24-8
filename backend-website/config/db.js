import mysql from 'mysql2'; // Use import statement for mysql2

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'web_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    // Instead of process.exit, you can log an error message and return
    console.error('Exiting process due to database connection error');
    return;
  }
  console.log('Database connected');
});

export default db; // Use export default for the db connection
