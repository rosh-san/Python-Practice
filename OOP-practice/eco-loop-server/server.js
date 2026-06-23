const crypto = require('crypto');
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
    const enrichedData = {
        ticketId: crypto.randomUUID(),
        status: "Pending",
        requestDetails: req.body
    };

    activePickup.push(enrichedData);
    
    res.json({
        message: "Pickup scheduled.",
        activePickups: activePickup,
        receivedData: enrichedData
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

app.patch('/api/accept-pickup/:id', (req, res) => {
    const pickupId = req.params.id;
    const ticket = activePickup.find(t => t.ticketId === req.params.id);
    if (ticket) {
        ticket.status = "Accepted by NGO";
        res.json({
            message: `Pickup with ID ${pickupId} has been accepted.`,
            updatedTicket: ticket
        });
    } else {
        res.status(404).json({
            message: `Pickup with ID ${pickupId} not found.`
        });
    }
});