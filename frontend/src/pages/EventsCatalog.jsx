import React, { useState, useMemo } from 'react';
import { EventCard } from '../components/EventCard';
import { Search, Filter, Calendar, MapPin, Sparkles } from 'lucide-react';

export const EventsCatalog = ({ events, onSelectEvent, onBookEvent, initialCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [sortBy, setSortBy] = useState('date');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = [
    'All',
    'Music & Concerts',
    'College Events',
    'Business & Conferences',
    'Sports',
    'Cultural Events',
    'Technology',
    'Private Events',
    'Charity & Social Events'
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      // Category filter
      if (selectedCategory !== 'All' && evt.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = evt.title.toLowerCase().includes(q);
        const matchDesc = evt.description.toLowerCase().includes(q);
        const matchLoc = evt.location.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc) return false;
      }
      // Price filter
      if (priceFilter === 'free' && evt.price > 0) return false;
      if (priceFilter === 'paid' && evt.price === 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'seats') return (b.capacity - b.registeredSeats) - (a.capacity - a.registeredSeats);
      return 0;
    });
  }, [events, selectedCategory, searchQuery, sortBy, priceFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header & Search */}
      <div style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        borderRadius: '1.2rem',
        padding: '2rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--glass-shadow)'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          Explore Upcoming Events
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Search among {events.length} active technology summits, music festivals, college fests and sports matches.
        </p>

        {/* Search Input Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{
            position: 'relative',
            flex: 1,
            minWidth: '280px'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by title, venue location, key speaker or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem 0.75rem 2.8rem',
                color: 'var(--text-main)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <option value="date">Sort by Date (Upcoming)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="seats">Most Seats Available</option>
          </select>

          {/* Price filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Prices</option>
            <option value="free">Free Only</option>
            <option value="paid">Paid Only</option>
          </select>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.06)',
                color: '#ffffff',
                border: selectedCategory === cat ? 'none' : '1px solid var(--border-color)',
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Results */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredEvents.length}</strong> event(s)
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
            <Filter size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>No events match your criteria</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Try clearing filters or searching for different terms like "Tech", "Concert", or "Fest".
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredEvents.map(evt => (
              <EventCard
                key={evt._id}
                event={evt}
                onSelect={onSelectEvent}
                onBook={onBookEvent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
