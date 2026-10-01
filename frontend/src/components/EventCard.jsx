import React from 'react';
import { Calendar, MapPin, Ticket, User, ArrowRight, CheckCircle } from 'lucide-react';

export const EventCard = ({ event, onSelect, onBook, onEdit, onDelete, isOrganizer, isAdmin }) => {
  const registered = event.registeredSeats || 0;
  const total = event.capacity || 100;
  const fillPercentage = Math.min(100, Math.round((registered / total) * 100));
  const seatsLeft = Math.max(0, total - registered);

  return (
    <div className="glass-panel glass-panel-hover" style={{
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      {/* Event Image Banner */}
      <div style={{ position: 'relative', height: '190px', width: '100%', overflow: 'hidden' }}>
        <img
          src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'}
          alt={event.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.06)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
        
        {/* Category Pill */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span className="badge badge-purple" style={{ backdropFilter: 'blur(8px)', background: 'rgba(11, 15, 25, 0.75)' }}>
            {event.category}
          </span>
        </div>

        {/* Price Tag */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span className="badge badge-cyan" style={{ backdropFilter: 'blur(8px)', background: 'rgba(11, 15, 25, 0.85)', fontSize: '0.85rem' }}>
            {event.price === 0 ? 'FREE' : `₹${event.price.toLocaleString('en-IN')}`}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
          lineHeight: '1.3',
          color: 'var(--text-main)'
        }}>
          {event.title}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
          <User size={14} style={{ color: 'var(--accent-purple)' }} />
          <span>Hosted by <strong>{event.organizerName || 'Apex Events'}</strong></span>
        </div>

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {event.description}
        </p>

        {/* Date & Location Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Calendar size={15} style={{ color: 'var(--accent-pink)' }} />
            <span>{event.date} • {event.time || '10:00 AM'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <MapPin size={15} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {event.location}
            </span>
          </div>
        </div>

        {/* Seat Counter & Progress Bar */}
        <div style={{ marginTop: 'auto', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>
            <span style={{ color: seatsLeft === 0 ? '#ef4444' : 'var(--text-main)' }}>
              {seatsLeft === 0 ? '🔥 SOLD OUT' : `${registered} / ${total} Seats Filled`}
            </span>
            <span style={{ color: 'var(--accent-purple)' }}>{seatsLeft} left</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${fillPercentage}%`,
                background: fillPercentage > 85 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'var(--accent-gradient)'
              }} 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isOrganizer || isAdmin ? (
            <>
              {onEdit && (
                <button
                  onClick={() => onEdit(event)}
                  className="btn-secondary"
                  style={{ flex: 1, fontSize: '0.82rem', padding: '0.5rem' }}
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(event._id)}
                  className="btn-danger"
                  style={{ flex: 1, fontSize: '0.82rem', padding: '0.5rem' }}
                >
                  Delete
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => onSelect(event)}
                className="btn-secondary"
                style={{ flex: 1, fontSize: '0.85rem', padding: '0.55rem' }}
              >
                Details
              </button>
              <button
                onClick={() => onBook(event)}
                disabled={seatsLeft === 0}
                className="btn-primary"
                style={{
                  flex: 1,
                  fontSize: '0.85rem',
                  padding: '0.55rem',
                  opacity: seatsLeft === 0 ? 0.5 : 1,
                  cursor: seatsLeft === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                <Ticket size={15} /> {seatsLeft === 0 ? 'Sold Out' : 'Book Ticket'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
