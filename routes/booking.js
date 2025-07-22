

const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/pay', (req, res) => {
  const { user_id, room_type, amount } = req.body;
  const sql = 'INSERT INTO bookings (user_id, room_type, amount, payment_status) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, room_type, amount, 'Paid'], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Payment Successful');
  });
});

module.exports = router;
