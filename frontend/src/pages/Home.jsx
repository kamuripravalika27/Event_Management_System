import React from 'react';
import { EventCard } from '../components/EventCard';
import { Calendar, TrendingUp, Users, DollarSign, Search, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const Home = ({ events, onSelectEvent, onBookEvent, onNavigateCategory, onNavigateCatalog }) => {
  const featuredEvents = events.filter(e => e.isFeatured || e.status === 'approved').slice(0, 6);

  const categories = [
    { title: 'Music & Concerts', icon: '🎵', bg: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' },
    { title: 'College Events', icon: '🎓', bg: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)' },
    { title: 'Business & Conferences', icon: '💼', bg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' },
    { title: 'Sports', icon: '🏆', bg: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' },
    { title: 'Cultural Events', icon: '🎨', bg: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
    { title: 'Technology', icon: '💻', bg: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
    { title: 'Private Events', icon: '🎂', bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { title: 'Charity & Social Events', icon: '❤️', bg: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        padding: '3rem 2.5rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--glass-shadow)'
      }}>
        {/* Background Overlay Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35) contrast(1.15)',
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '680px'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }} className="badge badge-purple">
            <Sparkles size={14} /> Next-Gen Event Management Platform
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '1.2rem',
            color: '#ffffff'
          }}>
            Discover, Book & Manage <span className="text-gradient">Extraordinary Events</span>
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: '#d1d5db',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Connect with live concerts, tech summits, college fests, and sports championships. Get instant digital QR tickets and live seat availability tracking.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => onNavigateCatalog()}
              className="btn-primary"
              style={{ fontSize: '1rem', padding: '0.85rem 1.8rem' }}
            >
              Explore Upcoming Events <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* EXAMPLE DASHBOARD METRICS BAR */}
      <section style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        borderRadius: '1.2rem',
        padding: '1.8rem 2rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--glass-shadow)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '1rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', marginBottom: '0.5rem' }}>
              <Calendar size={24} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Outfit' }}>48</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Active Events</div>
          </div>

          <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '1rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', marginBottom: '0.5rem' }}>
              <Users size={24} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Outfit' }}>1,250</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Registrations</div>
          </div>

          <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '1rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', marginBottom: '0.5rem' }}>
              <DollarSign size={24} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Outfit' }}>₹85,600</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Revenue Generated</div>
          </div>

          <div>
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', marginBottom: '0.5rem' }}>
              <ShieldCheck size={24} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Outfit' }}>100%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified Organizers</div>
          </div>
        </div>
      </section>

      {/* EVENT CATEGORIES GRID */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>🗂️ Event Categories</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Find your favorite experience by category</p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateCategory(cat.title)}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer'
              }}
            >
              <div style={{
                fontSize: '2rem',
                width: '52px',
                height: '52px',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.08)'
              }}>
                {cat.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{cat.title}</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Browse Events →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED UPCOMING EVENTS */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>🔥 Featured Events</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Top trending workshops, fests, and concerts</p>
          </div>
          <button
            onClick={() => onNavigateCatalog()}
            className="btn-secondary"
            style={{ fontSize: '0.88rem' }}
          >
            View All ({events.length}) →
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {featuredEvents.map(evt => (
            <EventCard
              key={evt._id}
              event={evt}
              onSelect={onSelectEvent}
              onBook={onBookEvent}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
