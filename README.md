# 🎉 Event Management System (EventFlow AI)

A full-stack, enterprise-ready web application built with **React.js, Node.js, Express.js, MongoDB, JWT Authentication, Chart.js, and QR Code Ticket Pass Generation**.

![Event Management System Banner](C:/Users/prava/.gemini/antigravity-ide/brain/d99399f1-5057-463e-8d1c-367f98917a4d/event_hero_banner_1790778308506.jpg)

---

## 🌟 Key Features

### 👤 User Capabilities
- **Role-Based Auth & Session**: Sign up / Login as standard user with JWT token authentication.
- **Browse & Search Events**: Filter by 8 curated event categories, date, price, or search keywords.
- **Seat Tracking Progress Bar**: Real-time visual seat counter (e.g., `320 / 500 Seats Filled`).
- **Interactive Ticket Booking**: Select ticket quantity, choose payment method, and confirm booking.
- **Digital QR Ticket Generation**: View & print digital QR code tickets with venue entry details.
- **My Bookings Dashboard**: Cancel registrations, view booking history, and export digital passes.

### 🎪 Organizer Capabilities
- **Organizer Portal**: Create, edit, and publish events with custom banner image, location, price, and capacity.
- **Attendee Tracking**: Inspect live lists of registered attendees per event (Ticket Code, Name, Email, Qty).
- **Event Metrics**: View total tickets sold, revenue generated, and event status.

### 🛡️ Admin Capabilities
- **Admin Control Center**: Platform-wide metrics (Total Events: 48, Registrations: 1,250, Revenue: ₹85,600).
- **Chart.js Analytics**: Visual category breakdown (Doughnut) & seat registrations bar chart (Bar).
- **Event Moderation Queue**: Approve or reject pending events, or delete inappropriate content.
- **User Accounts Directory**: Inspect and manage registered users and organizers.

---

## 🗂️ Event Categories
1. 🎵 **Music & Concerts**
2. 🎓 **College Events**
3. 💼 **Business & Conferences**
4. 🏆 **Sports**
5. 🎨 **Cultural Events**
6. 💻 **Technology**
7. 🎂 **Private Events**
8. ❤️ **Charity & Social Events**

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Vite, CSS3 Glassmorphism, Lucide Icons, Chart.js (`react-chartjs-2`), `qrcode.react`, `canvas-confetti` |
| **Backend** | Node.js, Express.js, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), `qrcode` |
| **Database** | MongoDB & Mongoose (with seamless In-Memory DB Fallback engine for out-of-the-box execution) |

---

## 🚀 How to Run locally

### 1. Start Backend Server
```bash
cd backend
npm install
npm start
```
*The backend API will run on `http://localhost:5000/api`*

### 2. Start Frontend App
```bash
cd frontend
npm install
npm run dev
```
*The frontend React app will open on `http://localhost:5173/`*

---

## ⚡ Instant 1-Click Demo Evaluation Mode
Use the **Role Switcher Pill Bar** at the top of the app to instantly test all 3 roles:
- **Demo User** (`user@eventhub.com`)
- **Demo Organizer** (`organizer@eventhub.com`)
- **Demo Admin** (`admin@eventhub.com`)
