const store = require('../utils/memoryStore');

// @desc    Get system-wide analytics & stats for Admin & Organizer dashboards
// @route   GET /api/admin/stats
exports.getDashboardStats = async (req, res) => {
  try {
    const events = await store.getEvents();
    const users = await store.getUsers();
    const bookings = await store.getBookings();

    const totalEvents = events.length;
    const totalUsers = users.length;
    const totalBookings = bookings.length;
    
    // Revenue calculation from non-cancelled bookings
    const totalRevenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((acc, b) => acc + (b.totalPrice || 0), 0);

    const totalSeatsRegistered = events.reduce((acc, e) => acc + (e.registeredSeats || 0), 0);
    const totalCapacity = events.reduce((acc, e) => acc + (e.capacity || 0), 0);

    // Category distribution breakdown
    const categoryStats = {};
    events.forEach(e => {
      categoryStats[e.category] = (categoryStats[e.category] || 0) + 1;
    });

    // Recent registered users & upcoming top events
    const upcomingEvents = events
      .filter(e => e.status === 'approved')
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);

    res.json({
      totalEvents,
      totalUsers,
      totalBookings,
      totalRevenue,
      totalSeatsRegistered,
      totalCapacity,
      categoryStats,
      upcomingEvents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
exports.getUsersList = async (req, res) => {
  try {
    const users = await store.getUsers();
    const sanitized = users.map(u => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      organization: u.organization,
      phone: u.phone,
      createdAt: u.createdAt
    }));
    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
