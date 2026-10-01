import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Sparkles, UserCheck } from 'lucide-react';

export const Login = ({ onSwitchToRegister, onSuccess }) => {
  const { login, demoAccounts, switchRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleQuickDemoLogin = (role) => {
    switchRole(role);
    if (onSuccess) onSuccess();
  };

  return (
    <div style={{ maxWidth: '440px', margin: '2rem auto', width: '100%' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            margin: '0 auto 1rem auto'
          }}>
            <LogIn size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sign in to access your event tickets and dashboard</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.75rem', borderRadius: '0.6rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@eventhub.com"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.6rem',
                  padding: '0.75rem 0.75rem 0.75rem 2.6rem',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.6rem',
                  padding: '0.75rem 0.75rem 0.75rem 2.6rem',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}>
            <LogIn size={18} /> Sign In
          </button>
        </form>

        {/* Quick Demo Login Pill Buttons */}
        <div style={{ marginTop: '1.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.8rem', fontWeight: '600' }}>
            ⚡ Fast Demo 1-Click Sign In:
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
            <button
              onClick={() => handleQuickDemoLogin('user')}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.4rem 0.7rem' }}
            >
              Demo User
            </button>
            <button
              onClick={() => handleQuickDemoLogin('organizer')}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.4rem 0.7rem' }}
            >
              Demo Organizer
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.4rem 0.7rem' }}
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            style={{ background: 'none', border: 'none', color: 'var(--accent-purple)', fontWeight: '700', cursor: 'pointer' }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
