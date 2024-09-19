const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

// Register new user
User.register = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// Find user by email
User.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
      if (err) reject(err);
      if (result.length) resolve(result[0]);
      else resolve(null);
    });
  });
};

module.exports = User;
