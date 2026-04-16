import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS ?? '',
  database: process.env.DB_NAME || 'AtlaHub',
};

const username = process.env.ADMIN_USER || 'admin';
const plainPassword = process.env.ADMIN_PASS || 'admin123';

const pool = mysql.createPool({
  ...config,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `);

  const passwordHash = await bcrypt.hash(plainPassword, 12);
  const [rows] = await pool.query('SELECT id FROM users WHERE username = ? LIMIT 1', [username]);

  if (rows.length) {
    await pool.query('UPDATE users SET password = ? WHERE username = ?', [passwordHash, username]);
    console.log(`✅ Updated admin user "${username}" with a fresh bcrypt hash.`);
  } else {
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [
      username,
      passwordHash,
    ]);
    console.log(`✅ Created admin user "${username}" with a bcrypt-hashed password.`);
  }
} catch (error) {
  console.error(`❌ Failed to create admin user: ${error.message}`);
  process.exitCode = 1;
} finally {
  await pool.end();
}
