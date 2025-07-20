

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/booking', require('./routes/booking'));

app.listen(8081, () => {
  console.log('Server running on port 8081');
});
