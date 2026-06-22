const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

const activePickup = [];

app.get('/', (req, res) => {
    res.send('Welcome to the Eco-Loop API Core. The server is live.');
});

app.get('/ngo-portal', (req, res) => {
    res.send('NGO Authentication Portal Live. ');
});

app.get('/api/system-status', (req, res) => {
    res.json({
        status: 'Operational',
        serverName: 'Eco-Loop Core',
        activeConnections: 42
    });
});

app.post('/api/request-pickup', (req, res) => {
    activePickup.push(req.body);
    res.json({
        message: "Pickup scheduled.",
        activePickups: activePickup,
        receivedData: req.body
    });
});

app.get('/api/view-pickups', (req, res) => {
    res.json({
        activePickups: activePickup
    });
});

app.listen(PORT, () => {
    console.log(`[System]: Eco-Loop server is currently running on http://localhost:${PORT}`);
});