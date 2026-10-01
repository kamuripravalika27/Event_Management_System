import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { X, Download, Printer, CheckCircle, Ticket, Calendar, MapPin, User, Mail } from 'lucide-react';

export const QRTicketModal = ({ booking, onClose }) => {
  useEffect(() => {
    // Trigger festive confetti animation on ticket issue!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const qrPayload = JSON.stringify({
    ticketCode: booking.ticketCode,
    event: booking.eventTitle,
    user: booking.userName,
    email: booking.userEmail,
    date: booking.eventDate,
    tickets: booking.ticketsCount
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '540px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'var(--text-main)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {/* Header Confirmation */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(34, 197, 94, 0.2)',
            color: '#22c55e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <CheckCircle size={36} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>Registration Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Your official digital ticket & QR code pass are ready.
          </p>
        </div>

        {/* Ticket Box */}
        <div style={{
          background: 'rgba(11, 15, 25, 0.85)',
          borderRadius: '1rem',
          border: '1px dashed var(--accent-purple)',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* Ticket Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ticket ID</span>
            <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--accent-cyan)', fontSize: '1rem' }}>
              {booking.ticketCode}
            </span>
          </div>

          {/* Event Title */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            {booking.eventTitle}
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
              <Calendar size={15} style={{ color: 'var(--accent-pink)' }} />
              <span>{booking.eventDate}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
              <MapPin size={15} style={{ color: 'var(--accent-cyan)' }} />
              <span>{booking.eventLocation}</span>
            </div>
          </div>

          {/* QR Code section */}
          <div style={{
            background: '#ffffff',
            padding: '1.2rem',
            borderRadius: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            maxWidth: '200px'
          }}>
            <QRCodeSVG value={qrPayload} size={150} level="H" includeMargin={true} />
            <span style={{ color: '#000000', fontSize: '0.7rem', fontWeight: '700', marginTop: '0.4rem' }}>
              SCAN AT VENUE ENTRY
            </span>
          </div>

          {/* Attendee Details */}
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span>Attendee Name:</span>
              <strong style={{ color: 'var(--text-main)' }}>{booking.userName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span>Email:</span>
              <strong style={{ color: 'var(--text-main)' }}>{booking.userEmail}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span>Tickets Booked:</span>
              <strong style={{ color: 'var(--accent-purple)' }}>{booking.ticketsCount} Ticket(s)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Paid:</span>
              <strong style={{ color: '#22c55e', fontSize: '1rem' }}>₹{booking.totalPrice?.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handlePrint}
            className="btn-secondary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Printer size={16} /> Print Pass
          </button>
          <button
            onClick={() => {
              alert(`Ticket ${booking.ticketCode} downloaded successfully! Check your downloads.`);
            }}
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
