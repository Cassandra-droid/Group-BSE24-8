import express from 'express';

const router = express.Router();

// In-memory storage for logs (for simplicity; consider a database for production)
let logs = [];

// POST endpoint to receive logs
router.post('/', (req, res) => {
    const logEntry = req.body;

    // Validate log entry (optional)
    if (!logEntry.event || !logEntry.status || !logEntry.timestamp) {
        return res.status(400).json({ message: 'Invalid log entry' });
    }

    // Store the log entry
    logs.push(logEntry);
    console.log('Log received:', logEntry); // Log to console for debugging

    res.status(201).json({ message: 'Log received' });
});

// GET endpoint to retrieve logs
router.get('/', (req, res) => {
    res.json(logs);
});

export default router;
