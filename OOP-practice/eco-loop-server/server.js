const crypto = require('crypto');
const express = require('express');
const app = express();

const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('[Database Error]: Connection failed.', err.stack);
    } else {
        console.log('[System]: Successfully connected to PostgreSQL database at', res.rows[0].now);
    }
});

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

app.post('/api/request-pickup', async (req, res) => { // async tells the server to wait for the database to finish before responding.
    try {
        const ticketId = crypto.randomUUID();
        
        const sqlQuery = `
            INSERT INTO pickups (id, user_name, address, item_description) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;
        
        const values = [ticketId, req.body.user, req.body.address, req.body.item];

        const newTicket = await pool.query(sqlQuery, values); // await tell the server to wait at this exact line.

        res.json({
            message: "Pickup permanently saved to PostgreSQL.",
            ticket: newTicket.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database transaction failed" });
    }
});

app.get('/api/view-pickups', async(req, res) => {
    try{
        const sqlQuery = 'SELECT * FROM pickups;';

        const result = await pool.query(sqlQuery)

        res.json({
            activePickups: result.rows
        });
    } catch (error) {
        console.error(error);
            res.status(500).json({ error: "Database failed."})
    }
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

app.listen(PORT, () => {
    console.log(`[System]: Eco-Loop server is currently running on http://localhost:${PORT}`);
});
