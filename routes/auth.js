const express = require('express');
const router = express.Router();
const db = require('../db');

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err) => {
    if (err) return res.status(500).send(err);
    res.send('User Registered');
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) {
      res.json({ login: true, user: results[0] });
    } else {
      res.json({ login: false });
    }
  });
});

module.exports = router;