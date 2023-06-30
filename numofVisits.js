/**
 * Module for retrieving the cat's average numbers of daily visits to the bathroom 
 * as well daily visits data for a period of a week, a month, and a three months. 
 * 
 * The module uses a connection pool from the 'db' module to execute SQL queries on the designated table.
 * 
 * @module avgNumofVisits
 */

// connect to the database and then run SQL query. 
const { pool } = require('./db');
// Load environment variables from .env file
require('dotenv').config(); 
schema = process.env.SCHEMA_NAME
table = process.env.TABLE_NAME

/**
 * Retrieves the average number of daily visits to the cat bathroom.
 * 
 * @async
 * @function retrieveAvgNumDailyVisits
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {number} The average number of daily visits to the bathroom.
 */
async function retrieveAvgNumDailyVisits(req, res) {

    // SQL query to calculate the average daily visits
    sql_query = `SELECT COUNT(*)/COUNT(DISTINCT date) as avg_daily_visits FROM ${schema}.${table}`
    //sql_query = "SELECT COUNT(*)/COUNT(DISTINCT date) as avg_daily_visits FROM cat_data;"
    try {
        // `queryResult` is the returned object
        const queryResult = await pool.query(sql_query); 
        // `rows` is a property of the queryresult object
        const avg_daily_visits = queryResult.rows[0].avg_daily_visits;
        return avg_daily_visits;

    } catch (error) {
        console.error(error);
    }
}


// Functions to retrieve data for plotting the first graph in the Web APP

/**
 * Retrieves the number of daily visits to the cat bathroom with a week's data
 * 
 * @async
 * @function retrieveNumOfVisitsOneWeek
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object[]} An array of objects, where each object contains a "date" field (the date of the entry) and a "num_entries" field (the number of entries for that date).
 */
async function retrieveNumOfVisitsOneWeek(req, res) {

    sql_query = ` 
    SELECT date, COUNT(*) as num_entries
    FROM ${schema}.${table}
    WHERE date >= (SELECT MAX(date) - INTERVAL '7' DAY FROM ${schema}.${table})
    GROUP BY date
    ORDER BY date;
    `;

    try {
        const queryResult = await pool.query(sql_query);
        return queryResult.rows;
    } catch (error) {
        console.error(error);
    }
}


/**
 * Retrieves the number of daily visits to the cat bathroom with a month's data
 * 
 * @async
 * @function retrieveNumOfVisitsOneMonth
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object[]} An array of objects, where each object contains a "date" field (the date of the entry) and a "num_entries" field (the number of entries for that date).
 */
async function retrieveNumOfVisitsOneMonth(req, res) {

    sql_query = ` 
    SELECT date, COUNT(*) as num_entries
    FROM ${schema}.${table}
    WHERE date >= (SELECT MAX(date) - INTERVAL '30' DAY FROM ${schema}.${table})
    GROUP BY date
    ORDER BY date;
    `;

    try {
        const queryResult = await pool.query(sql_query);
        return queryResult.rows;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Retrieves the number of daily visits to the cat bathroom with three months' data
 * 
 * @async
 * @function retrieveNumOfVisitsThreeMonth
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Object[]} An array of objects, where each object contains a "date" field (the date of the entry) and a "num_entries" field (the number of entries for that date).
 */
async function retrieveNumOfVisitsThreeMonth(req, res) {

    sql_query = ` 
    SELECT date, COUNT(*) as num_entries
    FROM ${schema}.${table}
    WHERE date >= (SELECT MAX(date) - INTERVAL '90' DAY FROM ${schema}.${table})
    GROUP BY date
    ORDER BY date;
    `;

    try {
        const queryResult = await pool.query(sql_query);
        return queryResult.rows;
    } catch (error) {
        console.error(error);
    }
}
module.exports = { retrieveAvgNumDailyVisits, retrieveNumOfVisitsOneWeek, retrieveNumOfVisitsOneMonth, retrieveNumOfVisitsThreeMonth};