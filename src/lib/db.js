import mysql from 'mysql2/promise';

let db;

if (!global.db) {
  try {
    // Namecheap MySQL connection pool
    global.db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      // Recommended for Vercel/serverless environments
      maxIdle: 10,
      idleTimeout: 60000,
    });
    console.log("✅ New MySQL connection pool created.");
  } catch (error) {
    console.error("❌ Could not create MySQL connection pool:", error);
  }
}

db = global.db;

// Helper to verify the connection
export async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('✅ Database connection established successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

export { db };