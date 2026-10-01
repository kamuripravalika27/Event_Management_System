const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  getTicketQR
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/all', protect, authorize('admin', 'organizer'), getAllBookings);
router.delete('/:id', protect, cancelBooking);
router.get('/:id/qr', protect, getTicketQR);

module.exports = router;
