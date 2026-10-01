import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Shield, Users, Calendar, DollarSign, Check, X, Trash2, AlertTriangle, Activity } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, [user]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const st = await api.getAdminStats();
      setStats(st);
      const uList = await api.getUsersList();
      setUsersList(uList);
      const evts = await api.getEvents();
      setEvents(evts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.updateEventStatus(id, status);
      fetchAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Admin Action: Remove this event permanently?')) return;
    try {
      await api.deleteEvent(id);
      fetchAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading || !stats) {
    return (
      <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
        <Activity size={36} className="text-gradient" style={{ animation: 'spin 1.5s linear infinite', margin: '0 auto 1rem auto' }} />
        <p>Loading Admin Command Center...</p>
      </div>
    );
  }

  // Chart data setup
  const barChartData = {
    labels: ['Tech', 'Music', 'College', 'Business', 'Sports', 'Cultural', 'Charity', 'Private'],
    datasets: [
      {
        label: 'Seat Registrations',
        data: [320, 680, 520, 190, 940, 210, 280, 45],
        backgroundColor: 'rgba(139, 92, 246, 0.75)',
        borderRadius: 8
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#9ca3af' } }
    },
    scales: {
      x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  const doughnutData = {
    labels: ['Technology', 'Music', 'College', 'Business', 'Sports'],
    datasets: [
      {
        data: [30, 35, 20, 10, 5],
        backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#06b6d4', '#10b981'],
        borderWidth: 0
      }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        borderRadius: '1.2rem',
        padding: '2rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--glass-shadow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '1rem', background: 'rgba(219, 39, 119, 0.15)', color: '#db2777' }}>
            <Shield size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
              🛡️ System Admin Analytics & Moderation
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Real-time platform analytics, user accounts directory, and event moderation queue.
            </p>
          </div>
        </div>

        {/* Example Dashboard Banner Counter */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.2rem'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.2rem', borderRadius: '0.9rem', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Events</div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'Outfit' }}>48</div>
            <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>+12% vs last month</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.2rem', borderRadius: '0.9rem', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Registrations</div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--accent-cyan)' }}>1,250</div>
            <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>+24% conversion</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.2rem', borderRadius: '0.9rem', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Revenue</div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'Outfit', color: '#22c55e' }}>₹85,600</div>
            <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>Gross GMV</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.2rem', borderRadius: '0.9rem', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Registered Users</div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--accent-purple)' }}>{usersList.length || 3}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Users & Organizers</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>
            Registrations by Category
          </h3>
          <Bar data={barChartData} options={barChartOptions} height={140} />
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', alignSelf: 'flex-start' }}>
            Category Breakdown
          </h3>
          <div style={{ width: '180px', height: '180px' }}>
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
            Tech (30%), Music (35%), College (20%)
          </div>
        </div>
      </div>

      {/* Events Moderation & Management Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>
          Platform Events Moderation & Status
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem' }}>Title</th>
                <th style={{ padding: '0.75rem' }}>Category</th>
                <th style={{ padding: '0.75rem' }}>Organizer</th>
                <th style={{ padding: '0.75rem' }}>Date</th>
                <th style={{ padding: '0.75rem' }}>Seats</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(evt => (
                <tr key={evt._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>{evt.title}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge badge-purple">{evt.category}</span>
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{evt.organizerName}</td>
                  <td style={{ padding: '0.75rem' }}>{evt.date}</td>
                  <td style={{ padding: '0.75rem' }}>{evt.registeredSeats} / {evt.capacity}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={evt.status === 'approved' ? 'badge badge-green' : 'badge badge-cyan'}>
                      {evt.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {evt.status !== 'approved' && (
                        <button
                          onClick={() => handleUpdateStatus(evt._id, 'approved')}
                          className="btn-primary"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                          title="Approve Event"
                        >
                          <Check size={14} /> Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteEvent(evt._id)}
                        className="btn-danger"
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                        title="Remove Event"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Directory Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>
          Registered Platform Accounts ({usersList.length})
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem' }}>User Name</th>
                <th style={{ padding: '0.75rem' }}>Email</th>
                <th style={{ padding: '0.75rem' }}>Role</th>
                <th style={{ padding: '0.75rem' }}>Organization</th>
                <th style={{ padding: '0.75rem' }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>{u.name}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={u.role === 'admin' ? 'badge badge-pink' : u.role === 'organizer' ? 'badge badge-purple' : 'badge badge-cyan'}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{u.organization || 'N/A'}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{u.phone || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
