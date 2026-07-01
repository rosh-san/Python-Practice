const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

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
        const { user, address, item } = req.body;

        const newTicket = await pool.query(
            "INSERT INTO pickups (user_name, address, item_description) VALUES ($1, $2, $3) RETURNING *",
            [user, address, item]
        );
        res.json(newTicket.rows[0]);

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

app.patch('/api/accept-pickup/:id' , async(req, res) => {
    try{
        const { id } = req.params;

        const updatedTicket = await pool.query("UPDATE pickups SET status = 'Accepted by NGO' WHERE id = $1 RETURNING *",
            [id] // injecting the URL id into SQL query.
            );

        if (updatedTicket.rowCount === 0) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        res.json(updatedTicket.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database update failed." });
    }
});

app.listen(PORT, () => {
    console.log(`[System]: Eco-Loop server is currently running on http://localhost:${PORT}`);
});
