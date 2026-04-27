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

  await conn.query('DELETE FROM medicines');
  const medicines = [
    [6, 'Panadol', 5.00, 608],
    [7, 'Paracetamol', 3.00, 499],
    [8, 'Cough Syrup', 120.00, 80],
    [9, 'Vitamin C', 8.50, 249],
    [10, 'Ibuprofen', 10.00, 320]
  ];

  for (const [id, name, price, quantity] of medicines) {
    await conn.query(
      'INSERT INTO medicines (id, name, price, quantity, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, price, quantity, new Date(), new Date()]
    );
  }

  await conn.query('ALTER TABLE medicines AUTO_INCREMENT = 11');
  const [rows] = await conn.query('SELECT id,name,price,quantity FROM medicines ORDER BY id');
  console.log(JSON.stringify(rows, null, 2));
  await conn.end();
})();
