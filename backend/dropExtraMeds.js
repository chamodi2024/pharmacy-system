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

  const [del] = await conn.query("DELETE FROM medicines WHERE name IN ('Antacid','Aspirin')");
  console.log('deleted', del.affectedRows);

  const [rows] = await conn.query('SELECT id,name,price,quantity FROM medicines');
  console.log(JSON.stringify(rows, null, 2));

  await conn.end();
})();
