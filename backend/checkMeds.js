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

  const [rows] = await conn.query('SELECT COUNT(*) AS count FROM medicines');
  console.log('medicine count:', rows);
  const [rows2] = await conn.query('SELECT * FROM medicines LIMIT 20');
  console.log('medicines:', JSON.stringify(rows2, null, 2));
  const [bills] = await conn.query('SELECT COUNT(*) AS count FROM bills');
  console.log('bill count:', bills);
  const [billItems] = await conn.query('SELECT COUNT(*) AS count FROM bill_items');
  console.log('bill_items count:', billItems);
  const [rows3] = await conn.query('SELECT id,patientName,totalAmount FROM bills LIMIT 20');
  console.log('bills:', JSON.stringify(rows3, null, 2));
  await conn.end();
})();
