import mysql from 'mysql2/promise';

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'hotel_xhema';
const MYSQL_PORT = parseInt(process.env.MYSQL_PORT || '3306', 10);

interface MySQLPool {
  pool: mysql.Pool | null;
}

/**
 * Global is used here to maintain a cached connection pool across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  var mysqlPool: MySQLPool | undefined;
}

let cached: MySQLPool = global.mysqlPool || { pool: null };

if (!global.mysqlPool) {
  global.mysqlPool = cached;
}

async function connectDB(): Promise<mysql.Pool> {
  if (cached.pool) {
    return cached.pool;
  }

  const pool = mysql.createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Test connection
  try {
    const connection = await pool.getConnection();
    console.log('✓ MySQL connected successfully');
    connection.release();
    cached.pool = pool;
  } catch (e) {
    throw new Error(`MySQL connection failed: ${e}`);
  }

  return cached.pool;
}

export default connectDB;
