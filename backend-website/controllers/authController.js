const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Import the database connection

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log("Validation error: Missing fields");
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database error during signup:", err); // Log database error
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (error) {
    console.error("Error creating user:", error); // Log creation error
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Login controller
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Database error during login:', err); // Log the error
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};
