const { Pool } = require("pg");
const credentials = {
    user: "metabase_catwatcher_user",
    database: "metabase_catwatcher_db",
    password: "metabase_catwatcher_pw",
    port: 5432,
    host: "localhost",
}

const pool = new Pool(credentials);

module.exports = { pool };