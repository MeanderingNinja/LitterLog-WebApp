/**
 * 20230302: The module ......
 */


// connect to the database and then run SQL query. 
const { pool } = require('./db');
//const plotly = require("plotly.js");

async function getDailyAverageDuration() {
    // query the cat_data table to get the average duration per visit on a daily basis
    // Tested to run 20230302
    const sql_query = `
    SELECT date, AVG(duration) AS avg_duration
    FROM cat_data
    GROUP BY date
    ORDER BY date
    `;

    const result = await pool.query(sql_query);
    console.log(result.rows)
    return result.rows;
  }



const { createCanvas } = require('canvas');

  
async function createChart() {
  
  // not running 20230302:   const chart = new Chart(canvas, {
                //^

                //TypeError: Chart is not a constructor
  const data = await getDailyAverageDuration();
  console.log("data is all  good.")
  const { Chart } = require('chartjs-node-canvas');
  console.log("chart is "+ Chart)
  const canvas = createCanvas(800, 600);
  console.log(canvas)
  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.map((d) => d.date),
      datasets: [{
        label: 'Average Duration',
        data: data.map((d) => d.duration),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  const image = chart.canvas.toBuffer();
  return image;
}

module.exports = {getDailyAverageDuration, createChart}

createChart();
  




// async function createGraph() {

//     const data = await getDailyAverageDuration();

//     const trace = {
//       x: data.map(row => row.date),
//       y: data.map(row => row.avg_duration),
//       type: "scatter",
//       mode: "lines+markers",
//       marker: {
//         color: "blue"
//       },
//       line: {
//         color: "blue"
//       }
//     };

//     const layout = {
//       title: "Daily Average Duration per Entry",
//       xaxis: {
//         title: "Date"
//       },
//       yaxis: {
//         title: "Average Duration"
//       }
//     };

//     const graphOptions = {
//       layout: layout,
//       filename: "daily-average-duration",
//       fileopt: "overwrite"
//     };

//     plotly.newPlot("graph", [trace], layout, function (err, msg) {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(msg);
//       }
//     });
// }   

  
//getDailyAverageDuration()
//createGraph()

