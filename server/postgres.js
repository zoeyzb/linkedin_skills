const { Pool } = require("pg");

let pool;

function getPool() {
  if (pool) return pool;
  const host = process.env.POSTGRES_HOST;
  const user = process.env.POSTGRES_USER || "postgres";
  const password = process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DATABASE || "postgres";
  const port = Number(process.env.POSTGRES_PORT || 5432);
  if (!host || !password) throw new Error("Postgres environment is not configured");
  pool = new Pool({
    host,
    user,
    password,
    database,
    port,
    ssl: { rejectUnauthorized: false },
    max: 3,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000
  });
  return pool;
}

async function query(text, values = []) {
  return getPool().query(text, values);
}

module.exports = { getPool, query };
