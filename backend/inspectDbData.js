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

  const queries = [
    'SELECT id,billId,medicineId,bill_id,medicine_id,quantity,price,createdAt,updatedAt FROM bill_items LIMIT 20',
    'SELECT id,name,price,quantity FROM medicines LIMIT 20',
    'SELECT id,patientName,totalAmount,createdAt,updatedAt FROM bills LIMIT 20',
    "SELECT CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA='pharmacy_db' AND TABLE_NAME='bill_items'"
  ];

  for (const sql of queries) {
    const [rows] = await conn.query(sql);
    console.log('=== ' + sql + ' ===');
    console.log(JSON.stringify(rows, null, 2));
  }

  await conn.end();
})();
