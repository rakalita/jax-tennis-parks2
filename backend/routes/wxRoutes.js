const express = require('express');

const router = express.Router();
const weatherController = require('../controllers/weatherController');

router
  .route('/:gridNum') //already the route is specified at the Router object
  .get(weatherController.getForecast);

router
  .route('/hourly/:gridNum') // only the id part is needed bc the generic route was already specified
  .get(weatherController.getHourlyForecast);

module.exports = router;
