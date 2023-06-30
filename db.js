require('dotenv').config(); // Load environment variables from .env file

// The Pool property contains a constructor function for creating a connection pool for a PostgreSQL database.
const { Pool } = require("pg");

const credentials = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
};

// create a new pool object and use it to manage connections to the database
const pool = new Pool(credentials);

module.exports = { pool };