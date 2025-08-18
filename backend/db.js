const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Spicyp204',
  database: 'support_ticket_crm',
  port: 3306
});

module.exports = pool.promise();
