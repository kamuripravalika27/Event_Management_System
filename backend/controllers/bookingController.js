const QRCode = require('qrcode');
const store = require('../utils/memoryStore');

// @desc    Book ticket for an event
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { eventId, ticketsCount = 1, paymentMethod } = req.body;

    const event = await store.findEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const requestedQty = Number(ticketsCount) || 1;
    const availableSeats = event.capacity - (event.registeredSeats || 0);

    if (availableSeats < requestedQty) {
      return res.status(400).json({ 
        message: `Only ${availableSeats} seats remaining for this event!` 
      });
    }

    const totalPrice = (event.price || 0) * requestedQty;
    const ticketCode = `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const booking = await store.createBooking({
      user: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      event: event._id,
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location,
      eventImage: event.image,
      ticketsCount: requestedQty,
      totalPrice,
      ticketCode,
      paymentMethod: paymentMethod || 'Credit Card / UPI',
      status: 'confirmed'
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's booking history
// @route   GET /api/bookings/my
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await store.getBookings({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin or Organizer)
// @route   GET /api/bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await store.getBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await store.cancelBooking(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate QR code for digital ticket
// @route   GET /api/bookings/:id/qr
exports.getTicketQR = async (req, res) => {
  try {
    const bookings = await store.getBookings();
    const booking = bookings.find(b => b._id.toString() === req.params.id.toString());
    
    if (!booking) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const payload = JSON.stringify({
      ticketCode: booking.ticketCode,
      event: booking.eventTitle,
      user: booking.userName,
      email: booking.userEmail,
      date: booking.eventDate,
      tickets: booking.ticketsCount
    });

    const qrDataUrl = await QRCode.toDataURL(payload);
    res.json({ qrCode: qrDataUrl, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
