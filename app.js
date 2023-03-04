// 20230228: This is a Node.js server side JavaScript file that uses Expres.js framework. 
// It initializes an instance of the Express app, serves static files from a public directory, 
// and creates two routes for retrieving average daily and weekly visits.
// It must be initiated on the server before having any effect (use node app.js in the command line to initiate it.)

// Grab all the things we need
const { response } = require('express')
const express = require('express')
const { retrieveAvgDailyVisits, retrieveAvgWeeklyVisits, retrieveAvgMonthlyVisits } = require('./avgVisits')
const { getDailyAverageDuration, createChart } = require('./avg_duration_per_visit')
 
// Configure our app
const app = express()

// 20230228: use() method: add middleware that serves static files from the "public" directory
app.use(express.static('./public'))
// 20230109: create a route to store the value 
// 20230110: should it be like this: (have to export numOfVisit from the js file first)
// app.use('/api/v1/retrieveNumOfVisit', numOfVisit) 
app.get('/api/v1/retrieveAvgDailyVisits', (req, res) => {
   // 20230110: numOfVisit is [object promise], response is the actual value
    const avg_daily_visits = retrieveAvgDailyVisits()
    avg_daily_visits.then((response) => {
        res.status(200).send(response)
    })
})

// 20230301: create a route to store the avg number of weekly visits
app.get('/api/v1/retrieveAvgWeeklyVisits', (req, res) => {
    // 20230110: numOfVisit is [object promise], response is the actual value
     const avg_weekly_visits = retrieveAvgWeeklyVisits()
     avg_weekly_visits.then((response) => {
         res.status(200).send(response)
     })
 })

// 20230301: create a route to store the avg visits per month
app.get('/api/v1/retrieveAvgMonthlyVisits', (req, res) => {
    // 20230110: numOfVisit is [object promise], response is the actual value
     const avg_monthly_visits = retrieveAvgMonthlyVisits()
     avg_monthly_visits.then((response) => {
         res.status(200).send(response)
     })
 })

 app.get('/api/v1//avgTimePerVisitDaily', (req, res) => {
  try {
    const avgTimePerVisitDailyData = getDailyAverageDuration();
    avgTimePerVisitDailyData.then((response) => {
      res.status(200).send(response)
    })
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// app.get('/api/v1//avgTimePerVisitDaily', async (req, res) => {
//    try {
//      const data = await getDailyAverageDuration();
//      const chartImage = await createChart(data);
//      res.writeHead(200, {
//        'Content-Type': 'image/png',
//        'Content-Length': chartImage.length
//      });
//      res.end(chartImage);
//    } catch (err) {
//      console.error(err);
//      res.status(500).send('Internal Server Error');
//    }
//  });
  
 
// Start our node server 
app.listen(5001, () => {
    console.log('Server is listening on port 5001....')
})