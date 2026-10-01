import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Shield, Sparkles } from 'lucide-react';

export const RoleSwitcherBanner = () => {
  const { user, switchRole } = useAuth();

  return (
    <div style={{
      background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
      padding: '0.4rem 1rem',
      color: '#ffffff',
      fontSize: '0.85rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.5rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sparkles size={16} style={{ color: '#fde047' }} />
        <span>Role Switcher (Instant Demo Mode):</span>
        <span style={{ 
          background: 'rgba(255,255,255,0.25)', 
          padding: '0.15rem 0.6rem', 
          borderRadius: '9999px',
          fontSize: '0.8rem' 
        }}>
          Current: <strong>{user?.name} ({user?.role?.toUpperCase()})</strong>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => switchRole('user')}
          style={{
            background: user?.role === 'user' ? '#ffffff' : 'rgba(255,255,255,0.2)',
            color: user?.role === 'user' ? '#4f46e5' : '#ffffff',
            border: 'none',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            transition: 'all 0.2s ease'
          }}
        >
          <User size={14} /> User
        </button>

        <button
          onClick={() => switchRole('organizer')}
          style={{
            background: user?.role === 'organizer' ? '#ffffff' : 'rgba(255,255,255,0.2)',
            color: user?.role === 'organizer' ? '#7c3aed' : '#ffffff',
            border: 'none',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            transition: 'all 0.2s ease'
          }}
        >
          <Calendar size={14} /> Organizer
        </button>

        <button
          onClick={() => switchRole('admin')}
          style={{
            background: user?.role === 'admin' ? '#ffffff' : 'rgba(255,255,255,0.2)',
            color: user?.role === 'admin' ? '#db2777' : '#ffffff',
            border: 'none',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            transition: 'all 0.2s ease'
          }}
        >
          <Shield size={14} /> Admin
        </button>
      </div>
    </div>
  );
};
