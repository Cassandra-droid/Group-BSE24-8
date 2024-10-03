import mysql from 'mysql2'; // Use import statement for mysql2

const db = mysql.createConnection({
  host: process.env.DB_HOST, //MySQL host from environment variables
  user: process.env.DB_USER, //MySQL user from environment variables
  password: process.env.DB_PASS, //MySQL password from environment variables
  database: process.env.DB_NAME //MySQL database name from environment variables
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    // Instead of process.exit, you can log an error message and return
    console.error('Exiting process due to database connection error');
    return;
  }
  console.log('Database connected successfully');
});

export default db; // Use export default for the db connection
