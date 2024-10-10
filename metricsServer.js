import express from 'express';
import client from 'prom-client';

// Create an Express application
const app = express();
const port = 3001;

// Create a new registry
const register = new client.Registry();

// Define a new Counter
const myCounter = new client.Counter({
    name: 'my_counter',
    help: 'This is my counter',
    registers: [register]
});

// Endpoint to increment the counter and push metrics
app.get('/push-metrics', (req, res) => {
    myCounter.inc(); // Increment the counter
    pushMetrics(); // Call the function to push metrics to the Pushgateway
    res.send('Metrics pushed!');
});

// Push metrics to the Pushgateway
function pushMetrics() {
    const pushgateway = new client.Pushgateway('localhost:9091'); // Pushgateway URL
    // Ensure you specify the job name correctly
    pushgateway.pushAdd({ job: 'pushgateway' }, (err, resp, body) => {
        if (err) {
            console.error('Could not push metrics to Pushgateway: ' + err);
        } else {
            console.log('Metrics pushed successfully.');
        }
    });
}

// Start the Express server
app.listen(port, () => {
    console.log(`Metrics server running at http://localhost:${port}/metrics`);
});
