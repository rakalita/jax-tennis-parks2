/* eslint-disable node/no-extraneous-require */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

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
    type: [String],
    validate: {
      validator: function (val) {
        let result = false;
        if (Array.isArray(val) && val.length > 0) {
          result = true;
        }
        return result;
      },
      message: 'League must have at least one value',
    },
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
    max: [50, 'A park can not have more than 50 courts'],
  },
  surface: {
    type: String,
    default: 'clay',
    trim: true,
    enum: {
      values: ['clay', 'hard', 'mixed'],
      message: 'Allowed surface values are: clay, hard or mixed',
    },
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
