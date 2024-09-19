const db = require('../config/db'); // Import the database connection

exports.order = (req, res) => {
  const { username, pizza_name, quantity, price, phone_number, payment_mode, delivery_location} = req.body;

  if (!username || !pizza_name|| !quantity || !price || !phone_number || !payment_mode || !delivery_location) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const sql = 'INSERT INTO orders (username, pizza_name, quantity, price, phone_number, payment_mode, delivery_location) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [username, pizza_name, quantity, price, phone_number, payment_mode, delivery_location], (err, result) => {
    if (err) {
      console.error('Database error during order creation:', err); // Log the error
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Order placed successfully' });
  });
};
