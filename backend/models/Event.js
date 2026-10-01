const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Music & Concerts',
      'College Events',
      'Business & Conferences',
      'Sports',
      'Cultural Events',
      'Technology',
      'Private Events',
      'Charity & Social Events'
    ]
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  capacity: {
    type: Number,
    required: true,
    default: 100
  },
  registeredSeats: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  organizerName: {
    type: String,
    default: 'Event Manager'
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
