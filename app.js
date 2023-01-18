// Grab all the things we need
const express = require('express')
const { retrieveData } = require('./avgDailyVisits')
// Configure our app
const app = express()

app.use(express.static('./public'))
// 20230109: create a route to store the value 
// 20230110: should it be like this: (have to export numOfVisit from the js file first)
// app.use('/api/v1/retrieveNumOfVisit', numOfVisit) 
app.get('/api/v1/retrieveAvgDailyVisits', (req, res) => {
    // 20230110: numOfVisit is [object promise], response is the actual value
    const avg_daily_visits = retrieveData()
    avg_daily_visits.then((response) => {
        res.status(200).send(response)
    })
})

// Start our node server 
app.listen(5001, () => {
    console.log('Server is listening on port 5001....')
})