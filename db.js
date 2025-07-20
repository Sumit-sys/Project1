
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12790930',
  password: 'Xzksp7C5CB',
  database: 'sql12790930',
  port: 3306
});
db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});
module.exports = db;