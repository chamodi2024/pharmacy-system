const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  for (const table of ['bills', 'bill_items']) {
    console.log('TABLE:', table);
    const [rows] = await conn.query(`SHOW CREATE TABLE \`${table}\``);
    console.log(rows[0]['Create Table']);
    console.log('---');
  }

  await conn.end();
})();
