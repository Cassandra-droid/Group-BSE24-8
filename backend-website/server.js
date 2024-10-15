import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Note the .js extension for ESM
import dotenv from 'dotenv';
import client from 'prom-client'; // Import prom-client

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Register default metrics and custom metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Collect default metrics like CPU and memory usage

// Create a custom metric to track the number of HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_request_total',
  help: 'Total number of HTTP requests received',
  labelNames: ['method', 'route', 'status']
});

// Middleware to count and record each request
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Expose a metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
