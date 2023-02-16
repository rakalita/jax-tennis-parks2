/* eslint-disable no-plusplus */
/* eslint-disable node/no-extraneous-require */
/* eslint-disable import/no-extraneous-dependencies */
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
    validate: {
      validator: function (val) {
        let result = false;
        const phoneCharArray = val.split('-'); // should be 3 elements
        if (phoneCharArray.length === 3) {
          for (let i = 0; i < phoneCharArray.length; i++) {
            if (Number.isNaN(+phoneCharArray[i])) {
              result = false;
              break;
            } else {
              result = true;
            }
          }
        }

        return result;
      },
      message:
        'Enter a valid phone number separated by -. Example 904-888-1212',
    },
  },
  league: {
    type: [String],
    validate: {
      validator: function (val) {
        let result = false;
        const letters = 'ABCD';
        const levels = '123';
        if (Array.isArray(val) && val.length > 0) {
          for (let i = 0; i < val.length; i++) {
            const charOne = val[i].charAt(0);
            const charTwo = val[i].charAt(1);
            if (charOne === '' || charTwo === '') {
              result = false;
              break;
            }
            if (letters.includes(charOne)) {
              if (levels.includes(charTwo)) {
                result = true;
              } else {
                result = false;
                break;
              }
            } else {
              result = false;
              break;
            }
          }
        }
        return result;
      },
      message:
        'At least one league is required and must have a value of ABCD with a level 1-3. Example A1, B2',
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
