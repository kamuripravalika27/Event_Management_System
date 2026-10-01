import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { QRTicketModal } from '../components/QRTicketModal';
import { Ticket, Calendar, MapPin, QrCode, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export const UserDashboard = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingForQR, setSelectedBookingForQR] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await api.getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this event registration?')) return;
    try {
      await api.cancelBooking(id);
      fetchBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  const activeBookings = bookings.filter(b => b.status !== 'cancelled');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        borderRadius: '1.2rem',
        padding: '2rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--glass-shadow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={user?.name}
            style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid var(--accent-purple)' }}
          />
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
              Welcome back, {user?.name}!
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Manage your registered tickets, digital QR passes, and booking history.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1.25rem', borderRadius: '0.8rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
              {activeBookings.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Passes</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1.25rem', borderRadius: '0.8rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#22c55e' }}>
              ₹{activeBookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Spent</div>
          </div>
        </div>
      </div>

      {/* Upcoming Active Event Tickets */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Ticket style={{ color: 'var(--accent-purple)' }} /> My Active Event Passes
        </h2>

        {activeBookings.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <Calendar size={42} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>No active bookings found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              You haven't booked any upcoming events yet. Browse the catalog to get your digital ticket!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.5rem'
          }}>
            {activeBookings.map(b => (
              <div key={b._id} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <img
                    src={b.eventImage || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'}
                    alt={b.eventTitle}
                    style={{ width: '80px', height: '80px', borderRadius: '0.6rem', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.68rem', marginBottom: '0.2rem', display: 'inline-block' }}>
                      {b.ticketCode}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.2' }}>{b.eventTitle}</h4>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                      <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      {b.eventDate}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <span>Tickets: <strong>{b.ticketsCount}</strong></span>
                  <span>Paid: <strong style={{ color: '#22c55e' }}>₹{b.totalPrice?.toLocaleString('en-IN')}</strong></span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setSelectedBookingForQR(b)}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem', padding: '0.5rem' }}
                  >
                    <QrCode size={15} /> View QR Ticket
                  </button>
                  <button
                    onClick={() => handleCancelBooking(b._id)}
                    className="btn-danger"
                    style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }}
                    title="Cancel Booking"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking History Table */}
      {bookings.length > 0 && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>
            Complete Booking History
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlig: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Ticket Code</th>
                  <th style={{ padding: '0.75rem' }}>Event Title</th>
                  <th style={{ padding: '0.75rem' }}>Date</th>
                  <th style={{ padding: '0.75rem' }}>Tickets</th>
                  <th style={{ padding: '0.75rem' }}>Amount</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                      {b.ticketCode}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>{b.eventTitle}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{b.eventDate}</td>
                    <td style={{ padding: '0.75rem' }}>{b.ticketsCount}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '700', color: '#22c55e' }}>₹{b.totalPrice?.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={b.status === 'confirmed' ? 'badge badge-green' : 'badge badge-purple'} style={{ background: b.status === 'cancelled' ? 'rgba(239, 68, 68, 0.2)' : undefined, color: b.status === 'cancelled' ? '#ef4444' : undefined }}>
                        {b.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QR Ticket Modal rendering */}
      {selectedBookingForQR && (
        <QRTicketModal
          booking={selectedBookingForQR}
          onClose={() => setSelectedBookingForQR(null)}
        />
      )}
    </div>
  );
};
