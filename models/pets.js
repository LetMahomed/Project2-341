const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative']
  },
  breed: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  vaccinated: {
    type: Boolean,
    default: false
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: [true, 'Owner ID is required']
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pet', petSchema);
