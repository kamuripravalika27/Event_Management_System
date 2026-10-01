const User = require('../models/User');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const { seedUsers, seedEvents, seedBookings } = require('./seedData');
const { getIsInMemoryMode } = require('../config/db');

let memoryUsers = JSON.parse(JSON.stringify(seedUsers));
let memoryEvents = JSON.parse(JSON.stringify(seedEvents));
let memoryBookings = JSON.parse(JSON.stringify(seedBookings));

const initDB = async () => {
  if (!getIsInMemoryMode()) {
    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('Seeding initial MongoDB data...');
        for (const u of seedUsers) {
          await User.create(u);
        }
        for (const e of seedEvents) {
          await Event.create(e);
        }
        for (const b of seedBookings) {
          await Booking.create(b);
        }
        console.log('✅ MongoDB successfully seeded!');
      }
    } catch (err) {
      console.error('MongoDB seed error:', err.message);
    }
  } else {
    console.log('✅ In-Memory Data Store initialized with sample events, users & bookings!');
  }
};

module.exports = {
  initDB,
  getUsers: async () => {
    if (!getIsInMemoryMode()) return await User.find();
    return memoryUsers;
  },
  findUserByEmail: async (email) => {
    if (!getIsInMemoryMode()) return await User.findOne({ email: email.toLowerCase() });
    return memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  findUserById: async (id) => {
    if (!getIsInMemoryMode()) return await User.findById(id);
    return memoryUsers.find(u => u._id.toString() === id.toString());
  },
  createUser: async (userData) => {
    if (!getIsInMemoryMode()) return await User.create(userData);
    const newUser = {
      _id: 'mem_user_' + Date.now(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryUsers.push(newUser);
    return newUser;
  },
  getEvents: async (query = {}) => {
    if (!getIsInMemoryMode()) {
      let filter = {};
      if (query.category && query.category !== 'All') filter.category = query.category;
      if (query.search) {
        filter.$or = [
          { title: { $regex: query.search, $options: 'i' } },
          { location: { $regex: query.search, $options: 'i' } },
          { description: { $regex: query.search, $options: 'i' } }
        ];
      }
      if (query.status) filter.status = query.status;
      return await Event.find(filter).sort({ createdAt: -1 });
    }
    
    let result = [...memoryEvents];
    if (query.category && query.category !== 'All') {
      result = result.filter(e => e.category === query.category);
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }
    if (query.status) {
      result = result.filter(e => e.status === query.status);
    }
    return result;
  },
  findEventById: async (id) => {
    if (!getIsInMemoryMode()) return await Event.findById(id);
    return memoryEvents.find(e => e._id.toString() === id.toString());
  },
  createEvent: async (eventData) => {
    if (!getIsInMemoryMode()) return await Event.create(eventData);
    const newEvent = {
      _id: 'mem_evt_' + Date.now(),
      registeredSeats: 0,
      status: 'approved',
      isFeatured: false,
      ...eventData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryEvents.unshift(newEvent);
    return newEvent;
  },
  updateEvent: async (id, updateData) => {
    if (!getIsInMemoryMode()) return await Event.findByIdAndUpdate(id, updateData, { new: true });
    const idx = memoryEvents.findIndex(e => e._id.toString() === id.toString());
    if (idx !== -1) {
      memoryEvents[idx] = { ...memoryEvents[idx], ...updateData, updatedAt: new Date() };
      return memoryEvents[idx];
    }
    return null;
  },
  deleteEvent: async (id) => {
    if (!getIsInMemoryMode()) return await Event.findByIdAndDelete(id);
    const idx = memoryEvents.findIndex(e => e._id.toString() === id.toString());
    if (idx !== -1) {
      const removed = memoryEvents.splice(idx, 1);
      return removed[0];
    }
    return null;
  },
  getBookings: async (filter = {}) => {
    if (!getIsInMemoryMode()) {
      return await Booking.find(filter).sort({ createdAt: -1 });
    }
    let result = [...memoryBookings];
    if (filter.user) {
      result = result.filter(b => b.user.toString() === filter.user.toString());
    }
    if (filter.event) {
      result = result.filter(b => b.event.toString() === filter.event.toString());
    }
    return result.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
  },
  createBooking: async (bookingData) => {
    if (!getIsInMemoryMode()) {
      const booking = await Booking.create(bookingData);
      await Event.findByIdAndUpdate(bookingData.event, {
        $inc: { registeredSeats: bookingData.ticketsCount }
      });
      return booking;
    }
    const newBooking = {
      _id: 'mem_bkg_' + Date.now(),
      status: 'confirmed',
      bookedAt: new Date(),
      ...bookingData
    };
    memoryBookings.unshift(newBooking);
    
    // Increment event seat count
    const evt = memoryEvents.find(e => e._id.toString() === bookingData.event.toString());
    if (evt) {
      evt.registeredSeats = (evt.registeredSeats || 0) + (bookingData.ticketsCount || 1);
    }
    return newBooking;
  },
  cancelBooking: async (id) => {
    if (!getIsInMemoryMode()) {
      const booking = await Booking.findById(id);
      if (booking && booking.status !== 'cancelled') {
        booking.status = 'cancelled';
        await booking.save();
        await Event.findByIdAndUpdate(booking.event, {
          $inc: { registeredSeats: -booking.ticketsCount }
        });
      }
      return booking;
    }
    const booking = memoryBookings.find(b => b._id.toString() === id.toString());
    if (booking && booking.status !== 'cancelled') {
      booking.status = 'cancelled';
      const evt = memoryEvents.find(e => e._id.toString() === booking.event.toString());
      if (evt) {
        evt.registeredSeats = Math.max(0, (evt.registeredSeats || 0) - (booking.ticketsCount || 1));
      }
    }
    return booking;
  }
};
