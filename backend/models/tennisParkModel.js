const mongoose = require('mongoose');

const tennisParkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'A name must be unique'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    unique: [true, 'Address must be unique'],
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
  },
  league: {
    type: Array,
    required: [true, 'League must have at least one value'],
  },
  lon: {
    type: Number,
    required: [true, 'Longitude must have a value'],
  },
  lat: {
    type: Number,
    required: [true, 'Latitude must have a value'],
  },
  gridNumber: {
    type: String,
    required: [true, 'GridNumber is required'],
  },
  description: {
    type: String,
    default: 'Public Park',
    trim: true,
  },
  courts: {
    type: Number,
  },
  surface: {
    type: String,
    dafault: 'clay',
    trim: true,
  },
  updateDate: {
    type: Date,
    default: Date.now(),
  },
  // creator: {  This is how to link users to tennis parks via user id key.
  //Example on how to use foreign keys in mongoose.
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
});

const TennisPark = mongoose.model('TennisPark', tennisParkSchema);
module.exports = TennisPark;
