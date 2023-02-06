const dotenv = require('dotenv');
const fetch = require('node-fetch');

exports.getWeatherGrid = async (x, y) => {
  const url = `${process.env.NWS_GRID_API_URL}${y},${x}`;
  //console.log(url);
  const response = await fetch(url);
  return response.json();
};

exports.getForecast = async (req, res) => {
  //console.log(`received getForecast request for ${req.params.gridNum}`);
  const url = `${process.env.NWS_FORECAST_API_URL}${req.params.gridNum}/forecast`;
  //console.log(url);
  let data;

  try {
    const response = await fetch(url);
    data = await response.json();
    res.status(200).json({
      status: 'success',
      updateTime: data.properties.updateTime,
      periods: data.properties.periods,
    });
  } catch (err) {
    // console.log(err.code);

    res.status(404).json({
      status: 'error',
      message: err.code,
    });
  }
};

exports.getHourlyForecast = async (req, res) => {
  //console.log(`received getForecast request for ${req.params.gridNum}`);
  const url = `${process.env.NWS_FORECAST_API_URL}${req.params.gridNum}/hourly`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({
      status: 'success',
      data: {
        periods: data.properties.periods,
      },
    });
  } catch (err) {
    console.log(err.code);
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

exports.geocode = async (address) => {
  let url =
    'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?benchmark=2020&format=json&address=';
  url = `${url}${address}`;
  // call the geocoder

  const response = await fetch(url);
  return response.json();
};
