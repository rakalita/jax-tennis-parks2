const { default: mongoose } = require('mongoose');
const TennisPark = require('../models/tennisParkModel');
const weatherController = require('./weatherController');

let tennisParkCacheArray = [];

exports.getAllTennisParks = async (req, res) => {
  try {
    const tennisParks = await TennisPark.find();
    if (tennisParks) {
      tennisParkCacheArray = tennisParks;
      //console.log('updating cache' + tennisParks.length);
    }
    res.status(200).json({
      status: 'success',
      results: tennisParks.length,
      data: {
        tennisparks: tennisParks,
      },
    });
  } catch (err) {
    if (tennisParkCacheArray) {
      res.status(200).json({
        status: 'success',
        results: tennisParkCacheArray.length,
        data: {
          tennisparks: tennisParkCacheArray,
        },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Unable to get Tennis Parks Data. ',
      });
    }
  }
};

exports.getTennisPark = async (req, res) => {
  try {
    const jtp = await TennisPark.findById(req.params.id);
    if (jtp) {
      res.status(200).json({
        status: 'success',
        data: {
          tennispark: jtp,
        },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Tennis Park id not found.',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

exports.updateTennisPark = async (req, res) => {
  if (req.body.address) {
    try {
      const geocodeResponse = await weatherController.geocode(req.body.address);
      //console.log('entry 2');
      req.body.lat = geocodeResponse.result.addressMatches[0].coordinates.y;
      req.body.lon = geocodeResponse.result.addressMatches[0].coordinates.x;
      const response = await weatherController.getWeatherGrid(
        req.body.lon,
        req.body.lat
      );

      req.body.gridNumber = `${response.properties.gridX},${response.properties.gridY}`;
      // console.log('entry 3');
      // console.log(req.body);
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: 'Address value is not a valid address',
      });
      return;
    }
  }
  try {
    const jtp = await TennisPark.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (jtp) {
      res.status(200).json({
        status: 'success',
        data: {
          tennispark: jtp,
        },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Tennis Park id not found.',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.deleteTennisPark = async (req, res) => {
  try {
    const jtp = await TennisPark.findByIdAndDelete(req.params.id);
    if (jtp) {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Tennis Park id not found.',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

exports.createTennisPark = async (req, res, next) => {
  // console.log('entry 1');
  // console.log(req.body);
  if (req.body.address) {
    try {
      const geocodeResponse = await weatherController.geocode(req.body.address);
      // console.log('entry 2');
      req.body.lat = geocodeResponse.result.addressMatches[0].coordinates.y;
      req.body.lon = geocodeResponse.result.addressMatches[0].coordinates.x;
      const response = await weatherController.getWeatherGrid(
        req.body.lon,
        req.body.lat
      );

      req.body.gridNumber = `${response.properties.gridX},${response.properties.gridY}`;
      //  console.log('entry 3');
      //  console.log(req.body);
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: 'Address value is not a valid address',
      });
      return;
    }
  }

  try {
    // console.log('entry 4');
    const newTennisPark = new TennisPark(req.body);
    await newTennisPark.save({
      new: true,
      runValidators: true,
    });
    // console.log('entry 5-after create call');
    res.status(201).json({
      status: 'success',
      data: {
        tennispark: newTennisPark,
      },
    });
    //console.log('entry 6');
  } catch (err) {
    // console.log('had an error - 7');
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};
