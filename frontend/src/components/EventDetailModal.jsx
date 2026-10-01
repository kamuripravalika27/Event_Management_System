import React, { useState } from 'react';
import { X, Calendar, MapPin, Ticket, User, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

export const EventDetailModal = ({ event, isOpen, onClose, onConfirmBooking }) => {
  const [ticketsCount, setTicketsCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('UPI / GPay');

  if (!isOpen || !event) return null;

  const registered = event.registeredSeats || 0;
  const total = event.capacity || 100;
  const seatsRemaining = Math.max(0, total - registered);
  const totalPrice = (event.price || 0) * ticketsCount;

  const handleBooking = () => {
    onConfirmBooking({
      eventId: event._id,
      ticketsCount,
      paymentMethod
    });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 180,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '750px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '0'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            color: '#ffffff',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {/* Header Hero Image */}
        <div style={{ position: 'relative', height: '260px', width: '100%' }}>
          <img
            src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(11, 15, 25, 0.95) 100%)'
          }} />

          <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.5rem', right: '1.5rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
              {event.category}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.2' }}>
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.8rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
          {/* Left Column: Details */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>About Event</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {event.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.8rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
                <Calendar size={18} style={{ color: 'var(--accent-pink)' }} />
                <div>
                  <div style={{ fontWeight: '700' }}>Date & Time</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{event.date} • {event.time}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
                <MapPin size={18} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <div style={{ fontWeight: '700' }}>Venue Address</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{event.location}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
                <User size={18} style={{ color: 'var(--accent-purple)' }} />
                <div>
                  <div style={{ fontWeight: '700' }}>Organizer</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{event.organizerName || 'Apex Event Group'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ticket Checkout Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem' }}>
                Book Tickets
              </h4>

              {/* Price per ticket */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ticket Price</span>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                  {event.price === 0 ? 'FREE' : `₹${event.price.toLocaleString('en-IN')}`}
                </span>
              </div>

              {/* Quantity selector */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                  Number of Tickets:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => setTicketsCount(Math.max(1, ticketsCount - 1))}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      color: 'var(--text-main)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '0.4rem',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: '800', fontSize: '1.1rem', width: '30px', textAlign: 'center' }}>
                    {ticketsCount}
                  </span>
                  <button
                    onClick={() => setTicketsCount(Math.min(seatsRemaining, ticketsCount + 1))}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      color: 'var(--text-main)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '0.4rem',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                  Payment Method:
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    padding: '0.6rem',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="UPI / GPay">UPI / GPay / PhonePe</option>
                  <option value="Credit Card">Credit / Debit Card</option>
                  <option value="NetBanking">Net Banking</option>
                </select>
              </div>

              {/* Total Calculation */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800' }}>
                  <span>Total Amount</span>
                  <span style={{ color: '#22c55e' }}>
                    {totalPrice === 0 ? 'FREE' : `₹${totalPrice.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={seatsRemaining === 0}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.75rem',
                fontSize: '1rem',
                opacity: seatsRemaining === 0 ? 0.5 : 1
              }}
            >
              <Ticket size={18} /> {seatsRemaining === 0 ? 'Sold Out' : 'Confirm Registration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
