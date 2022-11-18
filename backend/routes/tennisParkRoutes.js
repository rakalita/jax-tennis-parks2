const express = require('express');

const router = express.Router();
const tennisParkController = require('../controllers/tennisParkController');
const weatherController = require('../controllers/weatherController');

router
  .route('/') //already the route is specified at the Router object
  .get(tennisParkController.getAllTennisParks)
  .post(tennisParkController.createTennisPark);

router
  .route('/:id') // only the id part is needed bc the generic route was already specified
  .get(tennisParkController.getTennisPark)
  .patch(tennisParkController.updateTennisPark)
  .put(tennisParkController.updateTennisPark)
  .delete(tennisParkController.deleteTennisPark);

module.exports = router;
