import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Note the .js extension for ESM
import logRoutes from './routes/logRoutes.js';
import dotenv from 'dotenv';

dotenv.config();//load environment variables from .env file

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Authentication routes
app.use('/api/auth', authRoutes);

app.use('/api/logs', logRoutes); //
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
