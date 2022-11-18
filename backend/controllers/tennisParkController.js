const TennisPark = require('../models/tennisParkModel');
const weatherController = require('./weatherController');

let tennisParkCacheArray = [];

exports.getAllTennisParks = async (req, res) => {
  try {
    const tennisParks = await TennisPark.find();
    if (tennisParks) {
      tennisParkCacheArray = tennisParks;
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
    res.status(200).json({
      status: 'success',
      data: {
        tennispark: jtp,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

exports.updateTennisPark = async (req, res) => {
  try {
    const jtp = await TennisPark.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tennispark: jtp,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

exports.deleteTennisPark = async (req, res) => {
  try {
    await TennisPark.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

exports.createTennisPark = async (req, res) => {
  try {
    //   if (!req.body.lat || !req.body.lon) {
    const geocodeResponse = await weatherController.geocode(req.body.address);
    console.log(geocodeResponse);
    req.body.lat = geocodeResponse.result.addressMatches[0].coordinates.y;
    req.body.lon = geocodeResponse.result.addressMatches[0].coordinates.x;
    //if gridNumber is not provided will go find it and add it to the request
    if (!req.body.gridNumber) {
      const response = await weatherController.getWeatherGrid(
        req.body.lon,
        req.body.lat
      );
      req.body.gridNumber = `${response.properties.gridX},${response.properties.gridY}`;
    }
    const newTennisPark = await TennisPark.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tennispark: newTennisPark,
      },
    });
  } catch (err) {
    console.log(err.code);
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
};
