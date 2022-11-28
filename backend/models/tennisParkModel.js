const mongoose = require('mongoose');

const tennisParkSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'A park name must be unique'],
    required: [true, 'Park Name is required'],
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
  },
  lat: {
    type: Number,
  },
  gridNumber: {
    type: String,
  },
  description: {
    type: String,
    default: 'Public Park',
    trim: true,
  },
  courts: {
    type: Number,
    min: [1, 'A park must have at least 1 court'],
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
