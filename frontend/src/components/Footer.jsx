import React from 'react';
import { Calendar, Mail, Heart } from 'lucide-react';

export const Footer = ({ onSelectCategory }) => {
  const categories = [
    '🎵 Music & Concerts',
    '🎓 College Events',
    '💼 Business & Conferences',
    '🏆 Sports',
    '🎨 Cultural Events',
    '💻 Technology',
    '🎂 Private Events',
    '❤️ Charity & Social Events'
  ];

  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      marginTop: '4rem',
      padding: '3.5rem 2rem 2rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2.5rem'
      }}>
        {/* Brand Col */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Calendar size={20} />
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: '800' }} className="text-gradient">
              EventFlow
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
            The ultimate full-stack platform for discovering, organizing, and experiencing unforgettable events worldwide.
          </p>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            © 2026 EventFlow AI. All rights reserved.
          </div>
        </div>

        {/* Categories Col */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--text-main)' }}>
            Event Categories
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {categories.slice(0, 5).map((cat, i) => (
              <li key={i}>
                <button
                  onClick={() => onSelectCategory && onSelectCategory(cat.replace(/^[^\w]+/, '').trim())}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'var(--accent-purple)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--text-main)' }}>
            Platform Features
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li>🎟️ Digital QR Code Tickets</li>
            <li>📊 Live Seat & Revenue Analytics</li>
            <li>🛡️ Admin Moderation Portal</li>
            <li>⚡ Instant Confirmation</li>
            <li>💳 Secure Payment Gateways</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--text-main)' }}>
            Stay Updated
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            Subscribe to receive instant notifications on upcoming mega fests and exclusive VIP tickets.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.6rem',
                padding: '0.6rem 0.8rem',
                color: 'var(--text-main)',
                width: '100%',
                fontSize: '0.85rem'
              }}
            />
            <button className="btn-primary" style={{ padding: '0.6rem 1rem' }}>
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
