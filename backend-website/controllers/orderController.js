import db from '../config/db.js'; 

// Order creation controller
export const order = (req, res) => {
  const { username, pizza_name, quantity, price, phone_number, payment_mode, delivery_location } = req.body;

  // Validate required fields
  if (!username || !pizza_name || !quantity || !price || !phone_number || !payment_mode || !delivery_location) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  // Ensure quantity and price are numbers to prevent invalid data
  if (isNaN(quantity) || isNaN(price)) {
    return res.status(400).json({ message: 'Quantity and price must be numbers' });
  }

  // SQL query to insert order data
  const sql = 'INSERT INTO orders (username, pizza_name, quantity, price, phone_number, payment_mode, delivery_location) VALUES (?, ?, ?, ?, ?, ?, ?)';

  // Execute the query
  db.query(sql, [username, pizza_name, quantity, price, phone_number, payment_mode, delivery_location], (err, result) => {
    if (err) {
      console.error('Database error during order creation:', err);
      return res.status(500).json({ message: 'Database error occurred while placing the order' });
    }

    // Log order creation success
    console.log('Order created with ID:', result.insertId);
    res.status(201).json({ message: 'Order placed successfully', orderId: result.insertId });
  });
};
