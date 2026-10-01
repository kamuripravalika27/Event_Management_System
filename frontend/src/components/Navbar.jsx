import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Calendar, Ticket, Shield, Sun, Moon, LogOut, PlusCircle, Search, Home } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenCreateEvent }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 90,
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.85rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--glass-shadow)'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer'
        }}
      >
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
        }}>
          <Calendar size={24} />
        </div>
        <div>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: '800',
            fontFamily: 'Outfit, sans-serif'
          }} className="text-gradient">
            EventFlow
          </span>
          <span style={{
            fontSize: '0.68rem',
            display: 'block',
            color: 'var(--text-muted)',
            fontWeight: '600',
            marginTop: '-4px'
          }}>
            EVENT MANAGEMENT SYSTEM
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('home')}
          className={`btn-secondary ${activeTab === 'home' ? 'badge-purple' : ''}`}
          style={{
            border: activeTab === 'home' ? '1px solid var(--accent-purple)' : 'none',
            fontSize: '0.9rem'
          }}
        >
          <Home size={16} /> Home
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`btn-secondary ${activeTab === 'catalog' ? 'badge-purple' : ''}`}
          style={{
            border: activeTab === 'catalog' ? '1px solid var(--accent-purple)' : 'none',
            fontSize: '0.9rem'
          }}
        >
          <Search size={16} /> Explore Events
        </button>

        {user?.role === 'user' && (
          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`btn-secondary ${activeTab === 'my-bookings' ? 'badge-purple' : ''}`}
            style={{
              border: activeTab === 'my-bookings' ? '1px solid var(--accent-purple)' : 'none',
              fontSize: '0.9rem'
            }}
          >
            <Ticket size={16} /> My Bookings
          </button>
        )}

        {user?.role === 'organizer' && (
          <>
            <button
              onClick={() => setActiveTab('organizer-dashboard')}
              className={`btn-secondary ${activeTab === 'organizer-dashboard' ? 'badge-purple' : ''}`}
              style={{
                border: activeTab === 'organizer-dashboard' ? '1px solid var(--accent-purple)' : 'none',
                fontSize: '0.9rem'
              }}
            >
              <Calendar size={16} /> Organizer Dashboard
            </button>
            <button
              onClick={onOpenCreateEvent}
              className="btn-primary"
              style={{ fontSize: '0.88rem', padding: '0.5rem 1rem' }}
            >
              <PlusCircle size={16} /> Create Event
            </button>
          </>
        )}

        {user?.role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin-dashboard')}
            className={`btn-secondary ${activeTab === 'admin-dashboard' ? 'badge-purple' : ''}`}
            style={{
              border: activeTab === 'admin-dashboard' ? '1px solid var(--accent-purple)' : 'none',
              fontSize: '0.9rem'
            }}
          >
            <Shield size={16} /> Admin Dashboard
          </button>
        )}
      </div>

      {/* Right Controls: Theme Toggle & User Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          {theme === 'dark' ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: '#6366f1' }} />}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user.name}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-purple)'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>{user.name}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                {user.role} {user.organization ? `• ${user.organization}` : ''}
              </span>
            </div>
            <button
              onClick={logout}
              title="Logout"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ef4444',
                cursor: 'pointer',
                padding: '0.4rem',
                marginLeft: '0.5rem'
              }}
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setActiveTab('login')}
            className="btn-primary"
          >
            Login / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};
