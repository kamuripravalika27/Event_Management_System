import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { EventCard } from '../components/EventCard';
import { CreateEventModal } from '../components/CreateEventModal';
import { Calendar, PlusCircle, Users, DollarSign, TrendingUp, Edit3, Trash2, Eye } from 'lucide-react';

export const OrganizerDashboard = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEventAttendees, setSelectedEventAttendees] = useState(null);

  useEffect(() => {
    fetchOrganizerData();
  }, [user]);

  const fetchOrganizerData = async () => {
    try {
      const evts = await api.getEvents();
      setEvents(evts);
      const bkgs = await api.getAllBookings();
      setAllBookings(bkgs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateOrUpdateEvent = async (formData) => {
    try {
      if (editingEvent) {
        await api.updateEvent(editingEvent._id, formData);
      } else {
        await api.createEvent(formData);
      }
      fetchOrganizerData();
      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.deleteEvent(id);
      fetchOrganizerData();
    } catch (err) {
      alert(err.message);
    }
  };

  const totalEvents = events.length;
  const totalSeatsSold = events.reduce((acc, e) => acc + (e.registeredSeats || 0), 0);
  const totalRevenue = events.reduce((acc, e) => acc + ((e.registeredSeats || 0) * (e.price || 0)), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header & Stats */}
      <div style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        borderRadius: '1.2rem',
        padding: '2rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--glass-shadow)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
              🎪 Organizer Control Center
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Manage your published events, track seat registrations, and view attendee lists.
            </p>
          </div>
          <button
            onClick={() => { setEditingEvent(null); setIsModalOpen(true); }}
            className="btn-primary"
            style={{ fontSize: '0.95rem' }}
          >
            <PlusCircle size={18} /> Create New Event
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.2rem', borderRadius: '0.9rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span>Total Events</span>
              <Calendar size={18} style={{ color: 'var(--accent-purple)' }} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{totalEvents}</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.2rem', borderRadius: '0.9rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span>Total Tickets Sold</span>
              <Users size={18} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{totalSeatsSold}</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.2rem', borderRadius: '0.9rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span>Event Revenue</span>
              <DollarSign size={18} style={{ color: '#22c55e' }} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#22c55e' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Managed Events Grid */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.2rem' }}>
          Your Published Events
        </h2>

        {events.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <Calendar size={42} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>No events created yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
              Click "Create New Event" to publish your first fest or conference!
            </p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              <PlusCircle size={16} /> Create Event
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {events.map(evt => (
              <div key={evt._id} style={{ display: 'flex', flexDirection: 'column' }}>
                <EventCard
                  event={evt}
                  isOrganizer={true}
                  onEdit={(item) => { setEditingEvent(item); setIsModalOpen(true); }}
                  onDelete={handleDeleteEvent}
                />
                <button
                  onClick={() => {
                    const evtBookings = allBookings.filter(b => b.event.toString() === evt._id.toString() && b.status !== 'cancelled');
                    setSelectedEventAttendees({ event: evt, attendees: evtBookings });
                  }}
                  className="btn-secondary"
                  style={{ marginTop: '0.5rem', justifyContent: 'center', fontSize: '0.82rem' }}
                >
                  <Eye size={14} /> View Registered Attendees ({evt.registeredSeats || 0})
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Attendees Modal */}
      {selectedEventAttendees && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ maxWidth: '650px', width: '100%', maxHeight: '85vh', overflowY: 'auto', padding: '1.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>
                Attendees for {selectedEventAttendees.event.title}
              </h3>
              <button
                onClick={() => setSelectedEventAttendees(null)}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem' }}
              >
                Close
              </button>
            </div>

            {selectedEventAttendees.attendees.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                No attendees registered yet for this event.
              </p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                    <th style={{ padding: '0.6rem' }}>Ticket Code</th>
                    <th style={{ padding: '0.6rem' }}>Attendee Name</th>
                    <th style={{ padding: '0.6rem' }}>Email</th>
                    <th style={{ padding: '0.6rem' }}>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEventAttendees.attendees.map(a => (
                    <tr key={a._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.6rem', fontFamily: 'monospace', color: 'var(--accent-cyan)' }}>{a.ticketCode}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '600' }}>{a.userName}</td>
                      <td style={{ padding: '0.6rem', color: 'var(--text-muted)' }}>{a.userEmail}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '700' }}>{a.ticketsCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Create / Edit Event Modal */}
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdateEvent}
        initialData={editingEvent}
      />
    </div>
  );
};
