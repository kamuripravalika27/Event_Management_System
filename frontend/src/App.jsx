import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { RoleSwitcherBanner } from './components/RoleSwitcherBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { EventsCatalog } from './pages/EventsCatalog';
import { UserDashboard } from './pages/UserDashboard';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { EventDetailModal } from './components/EventDetailModal';
import { QRTicketModal } from './components/QRTicketModal';
import { CreateEventModal } from './components/CreateEventModal';
import { api } from './services/api';

const AppContent = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Modals state
  const [selectedEventForDetail, setSelectedEventForDetail] = useState(null);
  const [issuedBooking, setIssuedBooking] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events from API:', err);
    }
  };

  const handleSelectEvent = (evt) => {
    setSelectedEventForDetail(evt);
  };

  const handleConfirmBooking = async (bookingPayload) => {
    try {
      const booking = await api.createBooking(bookingPayload);
      setSelectedEventForDetail(null);
      setIssuedBooking(booking);
      fetchEvents();
    } catch (err) {
      alert(err.message || 'Booking failed');
    }
  };

  const handleCreateEvent = async (formData) => {
    try {
      await api.createEvent(formData);
      fetchEvents();
      setIsCreateModalOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to create event');
    }
  };

  const handleCategoryNavigate = (catName) => {
    setSelectedCategory(catName);
    setActiveTab('catalog');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Instant Demo Role Switcher Header */}
      <RoleSwitcherBanner />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateEvent={() => setIsCreateModalOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {activeTab === 'home' && (
          <Home
            events={events}
            onSelectEvent={handleSelectEvent}
            onBookEvent={handleSelectEvent}
            onNavigateCategory={handleCategoryNavigate}
            onNavigateCatalog={() => setActiveTab('catalog')}
          />
        )}

        {activeTab === 'catalog' && (
          <EventsCatalog
            events={events}
            onSelectEvent={handleSelectEvent}
            onBookEvent={handleSelectEvent}
            initialCategory={selectedCategory}
          />
        )}

        {activeTab === 'my-bookings' && (
          <UserDashboard user={user} />
        )}

        {activeTab === 'organizer-dashboard' && (
          <OrganizerDashboard user={user} />
        )}

        {activeTab === 'admin-dashboard' && (
          <AdminDashboard user={user} />
        )}

        {activeTab === 'login' && (
          <Login
            onSwitchToRegister={() => setActiveTab('register')}
            onSuccess={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'register' && (
          <Register
            onSwitchToLogin={() => setActiveTab('login')}
            onSuccess={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Event Details & Booking Modal */}
      <EventDetailModal
        event={selectedEventForDetail}
        isOpen={Boolean(selectedEventForDetail)}
        onClose={() => setSelectedEventForDetail(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Digital QR Ticket Modal */}
      {issuedBooking && (
        <QRTicketModal
          booking={issuedBooking}
          onClose={() => setIssuedBooking(null)}
        />
      )}

      {/* Create Event Modal for Organizers/Admins */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />

      {/* Footer */}
      <Footer onSelectCategory={handleCategoryNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
