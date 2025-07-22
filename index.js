// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Get available rooms between check-in and check-out
app.get('/rooms/available', async (req, res) => {
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
        return res.status(400).json({ error: 'checkIn and checkOut dates required' });
    }

    try {
        const [rooms] = await pool.query(`
            SELECT r.*
            FROM rooms r
            WHERE r.id NOT IN (
                SELECT b.room_id
                FROM bookings b
                WHERE NOT (
                    b.check_out <= ? OR b.check_in >= ?
                )
            )
        `, [checkIn, checkOut]);

        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Book a room
app.post('/book', async (req, res) => {
    const { guestName, roomId, checkIn, checkOut } = req.body;

    if (!guestName || !roomId || !checkIn || !checkOut) {
        return res.status(400).json({ error: 'Missing booking details' });
    }

    try {
        const [existing] = await pool.query(`
            SELECT * FROM bookings
            WHERE room_id = ?
              AND NOT (check_out <= ? OR check_in >= ?)
        `, [roomId, checkIn, checkOut]);

        if (existing.length > 0) {
            return res.status(409).json({ error: 'Room not available for selected dates' });
        }

        await pool.query(`
            INSERT INTO bookings (guest_name, room_id, check_in, check_out)
            VALUES (?, ?, ?, ?)
        `, [guestName, roomId, checkIn, checkOut]);

        res.status(201).json({ message: 'Booking successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all bookings
app.get('/bookings', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT b.id, b.guest_name, r.type AS room_type, b.check_in, b.check_out
            FROM bookings b
            JOIN rooms r ON b.room_id = r.id
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
