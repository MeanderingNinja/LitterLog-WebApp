/** 
 * This is a Node.js server side JavaScript file that uses Expres.js framework. 
 * It initializes an instance of the Express app, serves static files from a public directory, 
 * and creates routes for retrieving average daily visits and daily visits data for the period of a week, a month, and three months. 
 * Additionally, it creates routes for retrieving average time per bathroom visit based on all-time data, 
 * as well as weekly, and monthly data. 
 * Finally, it starts a node server listening on port 5001.
 * It must be initiated on the server before having any effect (use node app.js in the command line to initiate it.)
 */

const express = require('express')
const { retrieveAvgNumDailyVisits, retrieveNumOfVisitsOneWeek, retrieveNumOfVisitsOneMonth, retrieveNumOfVisitsThreeMonth } = require('./numofVisits')
const { getLatestDailyDurations, getWeeklyAverageDuration, getMonthlyAverageDuration, getAllTimeAverageDuration } = require('./durationPerVisit')
 
// Configure our app
const app = express()
// use(): add middleware that serves static files from the "public" directory
app.use(express.static('./public'))

// Create a route to store the value of the average number of daily visits
app.get('/api/v1/avgDailyVisits', async(req, res) => {
  try {
    const avg_visits =  await retrieveAvgNumDailyVisits()
    res.status(200).send(avg_visits)
  } catch (err){
    console.error('Error retrieving avg visits per day:', err.message);
    res.status(500).send('Internal Server Error');
  }
})


// Added the following APIs for data that will be used to plot graphs
app.get('/api/v1/NumOfVisitsOneWeek', async(req, res) => {
  try {
    const dailyVisitsOneWeek = await retrieveNumOfVisitsOneWeek()
    res.status(200).send(dailyVisitsOneWeek)
  } catch (err){
    console.error('Error retrieving avg visits per month:', err.message);
    res.status(500).send('Internal Server Error');
  }
 })

 app.get('/api/v1/NumOfVisitsOneMonth', async(req, res) => {
  try {
    const dailyVisitsOneMonth = await retrieveNumOfVisitsOneMonth()
    res.status(200).send(dailyVisitsOneMonth)
  } catch (err){
    console.error('Error retrieving avg visits per month:', err.message);
    res.status(500).send('Internal Server Error');
  }
 })

 app.get('/api/v1/NumOfVisitsThreeMonth', async(req, res) => {
  try {
    const dailyVisitsThreeMonths = await retrieveNumOfVisitsThreeMonth()
    res.status(200).send(dailyVisitsThreeMonths)
  } catch (err){
    console.error('Error retrieving avg visits per month:', err.message);
    res.status(500).send('Internal Server Error');
  }
 })

// Create a route to store average time per bathroom visit based on all time data
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
  
 
// Start our node server 
app.listen(5001, () => {
    console.log('Server is listening on port 5001....')
})