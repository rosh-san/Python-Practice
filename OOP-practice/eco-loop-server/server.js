const express = require('express');

const app = express();

const PORT = 3000;

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

// 5. Turn the server on
app.listen(PORT, () => {
    console.log(`[System]: Eco-Loop server is currently running on http://localhost:${PORT}`);
});