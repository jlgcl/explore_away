const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
  user: "postgres",
  password: "psqlpass",
  host: "localhost",
  port: 5432,
  database: "explore_away",
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;
