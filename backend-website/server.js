const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const authRoutes = require('./routes/authRoutes'); // Import authentication routes

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Authentication routes
app.use('/api/auth', authRoutes);


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
