const store = require('../utils/memoryStore');

// @desc    Get all events with category and search filter
// @route   GET /api/events
exports.getEvents = async (req, res) => {
  try {
    const { category, search, status } = req.query;
    const events = await store.getEvents({ category, search, status });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await store.findEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      location,
      image,
      price,
      capacity,
      isFeatured
    } = req.body;

    if (!title || !description || !category || !date || !location) {
      return res.status(400).json({ message: 'Missing required event fields' });
    }

    const event = await store.createEvent({
      title,
      description,
      category,
      date,
      time: time || '10:00 AM',
      location,
      image: image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
      price: Number(price) || 0,
      capacity: Number(capacity) || 100,
      registeredSeats: 0,
      status: req.user.role === 'admin' ? 'approved' : 'approved', // Auto-approve for demo ease or set pending
      organizer: req.user._id,
      organizerName: req.user.organization || req.user.name,
      isFeatured: Boolean(isFeatured)
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
exports.updateEvent = async (req, res) => {
  try {
    const event = await store.findEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check ownership if user is organizer
    if (req.user.role === 'organizer' && event.organizer && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this event' });
    }

    const updated = await store.updateEvent(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const event = await store.findEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (req.user.role === 'organizer' && event.organizer && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await store.deleteEvent(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve or reject event (Admin only)
// @route   PATCH /api/events/:id/status
exports.updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updated = await store.updateEvent(req.params.id, { status });
    if (!updated) return res.status(404).json({ message: 'Event not found' });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
