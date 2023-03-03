/**  
 * 20230228: Returns the avg daily data entries we have in the database. 
*/

// connect to the database and then run SQL query. 
const { pool } = require('./db');

async function retrieveAvgDailyVisits(req, res) {
    sql_query = "SELECT COUNT(*)/COUNT(DISTINCT date) as avg_daily_visits FROM cat_data"
    try {
        // queryResult is the returned object
        const queryResult = await pool.query(sql_query); 
        // rows is a property of the query result object
        const avg_daily_visits = queryResult.rows[0].avg_daily_visits;
        console.log("In avgDailyVisits.js, avg_daily_visits is " + avg_daily_visits);
        return avg_daily_visits;
    } catch (error) {
        console.error(error);
    }
}

// retrieveAvgDailyVisits();

async function retrieveAvgWeeklyVisits(req, res) {

    // Grouping the entries by week using the DATE_TRUNC function
    // The result of the subquery is a table with a single column entries_per_week, 
    // which contains integer values representing the number of entries in each week
    sql_query = ` 
    SELECT ROUND(AVG(visits_per_week), 2) AS avg_visits_per_week 
    FROM ( 
      SELECT COUNT(*) AS visits_per_week 
      FROM cat_data 
      GROUP BY DATE_TRUNC('week', date) 
    ) AS weekly_visits; 
    `;

    try {
        const queryResult = await pool.query(sql_query);
        // rows is a property of the query result object
        const avg_visits_per_week = queryResult.rows[0].avg_visits_per_week;
        console.log("avg_visits_per_week is " + avg_visits_per_week);
        return avg_visits_per_week;
    } catch (error) {
        console.error(error);
    }
}

//retrieveAvgWeeklyVisits()

async function retrieveAvgMonthlyVisits(req, res) {

    // Grouping the entries by week using the DATE_TRUNC function
    // The result of the subquery is a table with a single column entries_per_week, 
    // which contains integer values representing the number of entries in each week
    sql_query = ` 
    SELECT ROUND(AVG(visits_per_month), 2) AS avg_visits_per_month 
    FROM ( 
      SELECT COUNT(*) AS visits_per_month 
      FROM cat_data 
      GROUP BY DATE_TRUNC('month', date) 
    ) AS month_visits; 
    `;

    try {
        const queryResult = await pool.query(sql_query);
        // rows is a property of the query result object
        const avg_visits_per_month = queryResult.rows[0].avg_visits_per_month;
        console.log("avg_visits_per_month is " + avg_visits_per_month);
        return avg_visits_per_month;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { retrieveAvgDailyVisits, retrieveAvgWeeklyVisits, retrieveAvgMonthlyVisits };