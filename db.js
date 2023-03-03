
// The Pool property contains a constructor function for creating a connection pool for a PostgreSQL database.
const { Pool } = require("pg");

const credentials = {
    user: "metabase_catwatcher_user",
    database: "metabase_catwatcher_db",
    password: "metabase_catwatcher_pw",
    port: 5432,
    host: "localhost",
}

// create a new pool object and use it to manage connections to the database
const pool = new Pool(credentials);

module.exports = { pool };