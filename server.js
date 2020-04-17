const express = require('express');
const path = require('path');
const fs = require('fs');

const covid19ImpactEstimator = require('./src/estimator');

const app = express();

// Set Static Folder
app.use(express.static(path.join(__dirname, 'src/public')));

// init Middleware
app.use(express.json({ extended: false }));

const PORT = 4000 || process.env.PORT;

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  fs.readFile('db.json', (err, data) => {
    if (err) throw err;
    const dbData = JSON.parse(data);
    res.status(200).json({ success: true, count: dbData.length, data: dbData });
  });
});

app.post('/api/v1/on-covid-19', (req, res) => {
  const {
    population,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    periodType
  } = req.body;

  // res.send('');

  const estimator = {
    region: {
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    population,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    periodType
  };

  const calEstimator = covid19ImpactEstimator(estimator);

  fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    obj.data.push(calEstimator);
    fs.writeFile('db.json', JSON.stringify(obj, null, 2), 'utf-8',
      // eslint-disable-next-line
      (err) => {
        if (err) throw err;
      });
    res.status(200).json({ success: true });
  });
});

// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));