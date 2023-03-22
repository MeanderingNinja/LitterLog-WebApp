/** 
 * 20230228: This is a Node.js server side JavaScript file that uses Expres.js framework. 
 * It initializes an instance of the Express app, serves static files from a public directory, 
 * and creates routes for retrieving average daily, weekly, and monthly visits. 
 * Additionally, it creates routes for retrieving average time per bathroom visit based on all-time data, as well as daily, weekly, and monthly averages.
 * Finally, it starts a node server listening on port 5001.
 * It must be initiated on the server before having any effect (use node app.js in the command line to initiate it.)
 */

// Grab all the things we need
//const { response } = require('express')
const express = require('express')
const { retrieveAvgNumDailyVisits, retrieveNumOfVisitsOneWeek, retrieveNumOfVisitsOneMonth, retrieveNumOfVisitsThreeMonth } = require('./avgNumofVisits')
const { getLatestDailyDurations, getWeeklyAverageDuration, getMonthlyAverageDuration, getAllTimeAverageDuration } = require('./avgDurationPerVisit')
 
// Configure our app
const app = express()
// 20230228: use() method: add middleware that serves static files from the "public" directory
app.use(express.static('./public'))

// 20230109: create a route to store the value of avg num of daily visits
// 20230306: added async and await so that I don't have to use .then() method to resolve a promise (the returned value of retrieveDailyVisits() is a promise)
app.get('/api/v1/avgDailyVisits', async(req, res) => {

   // 20230110: avg_daily_visits is [object promise], response is the actual value
  try {
    const avg_visits =  await retrieveAvgNumDailyVisits()
    // avg_daily_visits.then((response) => {
    //     res.status(200).send(response)
    // })
    res.status(200).send(avg_visits)
  } catch (err){
    console.error('Error retrieving avg visits per day:', err.message);
    res.status(500).send('Internal Server Error');
  }
})



// 20230321: Added the following APIs from which data will be retrieved to plot graphs for the Web APP, replacing Metabase graphs
app.get('/api/v1/NumOfVisitsOneWeek', async(req, res) => {
  try {
    const avg_monthly_visits = await retrieveNumOfVisitsOneWeek()
    res.status(200).send(avg_monthly_visits)
  } catch (err){
    console.error('Error retrieving avg visits per month:', err.message);
    res.status(500).send('Internal Server Error');
  }
 })

 app.get('/api/v1/NumOfVisitsOneMonth', async(req, res) => {
  try {
    const avg_monthly_visits = await retrieveNumOfVisitsOneMonth()
    res.status(200).send(avg_monthly_visits)
  } catch (err){
    console.error('Error retrieving avg visits per month:', err.message);
    res.status(500).send('Internal Server Error');
  }
 })

 app.get('/api/v1/NumOfVisitsThreeMonth', async(req, res) => {
  try {
    const avg_monthly_visits = await retrieveNumOfVisitsThreeMonth()
    res.status(200).send(avg_monthly_visits)
  } catch (err){
    console.error('Error retrieving avg visits per month:', err.message);
    res.status(500).send('Internal Server Error');
  }
 })

// 20230307: Create a route to store average time per bathroom visit based on all time data
app.get('/api/v1/avgTimePerVisitAllTime', async(req, res) => {
 try {
   const avgTimePerVisit = await getAllTimeAverageDuration();
  // send() method of the res object expects a string as its argument.
  res.status(200).send(avgTimePerVisit.toString())
 } catch (err) {
  console.error('Error retrieving all-time average visit duration:', err.message);
  res.status(500).send('Internal Server Error');
 }
});


app.get('/api/v1/TimePerVisitLatestDaily', async (req, res) => {
 try {
   const timePerVisitLatestDailyData = await getLatestDailyDurations();
   res.status(200).send(timePerVisitLatestDailyData)
 } catch (err) {
   console.error('Error retrieving average time per visit on a daily basis:', err.message);
   res.status(500).send('Internal Server Error');
 }
});

app.get('/api/v1//avgTimePerVisitWeekly', async (req, res) => {
 try {
   const avgTimePerVisitWeeklyData = await getWeeklyAverageDuration();
   res.status(200).send(avgTimePerVisitWeeklyData)
 } catch (err) {
   console.error('Error retrieving average time per visit on a weekly basis:', err.message);
   res.status(500).send('Internal Server Error');
 }
});

app.get('/api/v1//avgTimePerVisitMonthly', async (req, res) => {
 try {
   const avgTimePerVisitMonthlyData = await getMonthlyAverageDuration();
   res.status(200).send(avgTimePerVisitMonthlyData)
 } catch (err) {
   console.error('Error retrieving average time per visit on a monthly basis:', err.message);
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