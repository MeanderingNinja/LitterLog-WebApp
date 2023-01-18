// 20230106: This file works and it returns the number of data entries we have in the database. 
// connect to the database and then run SQL query. 
const { pool } = require('./db');

async function retrieveData(req, res) {
    try {
        //res is the returned object
        const res = await pool.query("SELECT COUNT(*)/COUNT(DISTINCT date) as avg_daily_visits FROM cat_data");
        // rows is a property of the query result object
        const avg_daily_visits = res.rows[0].avg_daily_visits;
        console.log("In avgDailyVisits.js, avg_daily_visits is " + avg_daily_visits);
        return avg_daily_visits;
    } catch (error) {
        console.error(error);
    }
}

// retrieveData();
// NO need to export as the funtion is already invoked.
module.exports = { retrieveData };