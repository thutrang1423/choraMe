import mysql from 'mysql2/promise';

// Tạo pool kết nối
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1423',
  database: 'my-api',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
