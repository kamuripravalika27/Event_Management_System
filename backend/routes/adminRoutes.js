const express = require('express');
const router = express.Router();
const { getDashboardStats, getUsersList } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/stats', protect, getDashboardStats);
router.get('/users', protect, authorize('admin'), getUsersList);

module.exports = router;
