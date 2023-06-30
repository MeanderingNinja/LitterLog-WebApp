/**
 * This module provides functions to query average duration statistics.
 * @module avgDurationPerVisit
 */


// connect to the database and then run SQL query. 
const { pool } = require('./db');
require('dotenv').config(); 
schema = process.env.SCHEMA_NAME
table = process.env.TABLE_NAME

/**
 * Returns the average duration of all records in the database.
 * @async
 * @function getAllTimeAverageDuration
 * @returns {Promise<number>} The average duration per bathroom visit based on all records in the database.
 */
async function getAllTimeAverageDuration() {
  const sql_query = `
  SELECT ROUND(AVG(Cast(duration AS numeric)), 2) AS avg_duration
  FROM ${schema}.${table}
  `;

  const result = await pool.query(sql_query);
  return result.rows[0].avg_duration;
}

/**
 * Returns the duration with the most recent 1 day data.
 * @async
 * @function getLatestDailyDurations
 * @returns {Promise<Array>} The average duration on a daily basis.
 */
async function getLatestDailyDurations() {
  const sql_query = `
  SELECT entry, duration 
  FROM ${schema}.${table} 
  WHERE DATE_TRUNC('day', date) = (SELECT DATE_TRUNC('day', date) as latest_date
  FROM ${schema}.${table}
  ORDER BY date DESC LIMIT 1);
  `;

  const result = await pool.query(sql_query);
  return result.rows;
}


/**
 * Returns the daily average duration per visit with a week's data.
 * @async
 * @function getWeeklyAverageDuration
 * @returns {Promise<Array>} Returns the average duration on a weekly basis.
 */
async function getWeeklyAverageDuration() {
  const sql_query = `
  SELECT date, AVG(duration) AS avg_duration
  FROM ${schema}.${table}
  WHERE date >= (SELECT MAX(date) - INTERVAL '7' DAY FROM ${schema}.${table})   
  GROUP BY date
  ORDER BY date;
  `;
  const result = await pool.query(sql_query);
  return result.rows;
}


/**
 * Returns the daily average duration per visit with a month's data (modified on 20230321).
 * @async
 * @function getMonthlyAverageDuration
 * @returns {Promise<Array>} Returns the average duration on a monthly basis.
 */
async function getMonthlyAverageDuration() {
  const sql_query = `
  SELECT date, AVG(duration) AS avg_duration
  FROM ${schema}.${table}
  WHERE date >= (SELECT MAX(date) - INTERVAL '30' DAY FROM ${schema}.${table}) 
  GROUP BY date
  ORDER BY date;
  `;
  const result = await pool.query(sql_query);
  console.log(result.rows)
  return result.rows;
}

module.exports = {getLatestDailyDurations, getWeeklyAverageDuration, getMonthlyAverageDuration, getAllTimeAverageDuration}

